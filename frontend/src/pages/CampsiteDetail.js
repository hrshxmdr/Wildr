import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button, Form, Modal } from 'react-bootstrap';
import campsites from './campsites';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { DateRange } from 'react-date-range';
import { addDays, differenceInCalendarDays, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import api from '../api';
import { useAuth } from '../AuthContext';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReviewList from '../components/ReviewList';
import './CampsiteDetail.css';

// Fix default marker icons for webpack builds
delete L.Icon.Default.prototype._getIconUrl; // eslint-disable-line
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const fetchWeather = async (lat, lon) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  if (!lat || !lon) return { ok: false, reason: 'No coordinates' };
  try {
    if (!apiKey) {
      return {
        ok: true,
        mock: true,
        data: {
          name: 'On-site',
          weather: [{ description: 'Partly cloudy', icon: '04d' }],
          main: { temp: 293.15, humidity: 60 },
          wind: { speed: 3.2 },
          visibility: 8000
        }
      };
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather fetch failed');
    const json = await res.json();
    return { ok: true, data: json };
  } catch (e) {
    return { ok: false, reason: e.message };
  }
};

const kToC = (k) => Math.round(k - 273.15);

const CampsiteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const campsite = useMemo(() => campsites.find(c => String(c.id) === String(id)), [id]);

  const [weather, setWeather] = useState({ loading: true });
  const [backendCampsiteId, setBackendCampsiteId] = useState(null);
  // Booking state
  const [bookingRange, setBookingRange] = useState([
    { startDate: new Date(), endDate: addDays(new Date(), 2), key: 'selection' }
  ]);
  const [guests, setGuests] = useState(2);
  const [payment, setPayment] = useState('pay_on_arrival');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirm, setConfirm] = useState(null); // { id, checkIn, checkOut, guests, payment }
  // Gallery state - normalize images whether strings or objects
  const rawImages = (campsite?.images && campsite.images.length > 0)
    ? campsite.images
    : (campsite?.image ? [campsite.image] : []);
  const images = rawImages.map((it) => typeof it === 'string' ? it : it?.url).filter(Boolean);
  const objCaptions = rawImages.map((it) => (typeof it === 'object' && it?.caption) ? it.caption : null);
  const objCredits = rawImages.map((it) => (typeof it === 'object' && it?.credit) ? it.credit : null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedMap, setLoadedMap] = useState({});
  const onImgLoad = (idx) => setLoadedMap(prev => ({ ...prev, [idx]: true }));
  const getCaption = (idx) => objCaptions[idx] || (campsite?.imageCaptions?.[idx]) || campsite?.name || '';
  const getCredit = (idx) => objCredits[idx] || (Array.isArray(campsite?.imageCredits) ? campsite.imageCredits[idx] : null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { setLightboxOpen(false); }
      if (e.key === 'ArrowLeft') { setLightboxIndex((lightboxIndex - 1 + images.length) % images.length); }
      if (e.key === 'ArrowRight') { setLightboxIndex((lightboxIndex + 1) % images.length); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, lightboxIndex, images.length]);

  useEffect(() => {
    if (!campsite) return;
    const [lat, lon] = campsite.coordinates || [];
    if (lat && lon) {
      fetchWeather(lat, lon).then(setWeather);
    } else {
      setWeather({ ok: false, reason: 'No coordinates', loading: false });
    }
    
    // Fetch backend campsite ID for reviews
    fetchBackendCampsiteId();
  }, [campsite]);

  const fetchBackendCampsiteId = async () => {
    if (!campsite) return;
    
    try {
      // Try to find existing campsite by name and location
      const res = await api.get('/campsites', { 
        params: { search: campsite.name, limit: 10 } 
      });
      const rows = Array.isArray(res.data) ? res.data : [];
      console.log('Backend campsites found:', rows);
      console.log('Looking for campsite:', campsite.name, campsite.location);
      
      // Find exact match
      const [latCreate, lonCreate] = campsite.coordinates || [];
      const exact = rows.find(r => {
        const nameOk = (r.name || '').toLowerCase() === (campsite.name || '').toLowerCase();
        const locOk = (r.location || '').toLowerCase() === (campsite.location || '').toLowerCase();
        const latOk = typeof latCreate === 'number' && typeof r.coordinates?.[0] === 'number' 
          ? Math.abs(r.coordinates[0] - latCreate) < 0.01 : true;
        const lonOk = typeof lonCreate === 'number' && typeof r.coordinates?.[1] === 'number' 
          ? Math.abs(r.coordinates[1] - lonCreate) < 0.01 : true;
        console.log('Checking campsite:', r.name, 'nameOk:', nameOk, 'locOk:', locOk);
        return nameOk && (locOk || (latOk && lonOk));
      });
      
      if (exact?._id) {
        console.log('Found matching backend campsite:', exact._id);
        setBackendCampsiteId(exact._id);
      } else {
        console.log('No matching backend campsite found, creating one...');
        // If no exact match found, create the campsite in backend
        await createBackendCampsite();
      }
    } catch (error) {
      console.error('Error fetching backend campsite:', error);
    }
  };

  const createBackendCampsite = async () => {
    if (!user) {
      console.log('User not logged in, cannot create campsite');
      return;
    }

    try {
      const [latCreate, lonCreate] = campsite.coordinates || [];
      const urls = (campsite.images || []).map(it => typeof it === 'string' ? it : it?.url).filter(Boolean).slice(0, 5);
      
      const payload = {
        name: campsite.name,
        location: campsite.location,
        lat: typeof latCreate === 'number' ? latCreate : undefined,
        lon: typeof lonCreate === 'number' ? lonCreate : undefined,
        images: urls,
        description: campsite.description || `Beautiful campsite at ${campsite.location}`,
        facilities: campsite.facilities || [],
        tags: campsite.tags || []
      };

      console.log('Creating backend campsite with payload:', payload);
      const created = await api.post('/campsites', payload);
      
      if (created?.data?._id) {
        console.log('Created backend campsite:', created.data._id);
        setBackendCampsiteId(created.data._id);
      }
    } catch (error) {
      console.error('Error creating backend campsite:', error);
      // Even if creation fails, we can still show reviews section with a fallback
      console.log('Creation failed, but showing reviews section anyway');
    }
  };

  if (!campsite) {
    return (
      <Container className="py-4">
        <Alert variant="warning">Campsite not found.</Alert>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </Container>
    );
  }

  const [lat, lon] = campsite.coordinates || [];

  const checkIn = bookingRange[0].startDate;
  const checkOut = bookingRange[0].endDate;
  const nights = Math.max(1, differenceInCalendarDays(checkOut, checkIn));
  const pricePerNight = 50; // placeholder price
  const total = nights * pricePerNight;

  // Ensure there is a backend Campsite document and return its _id
  const ensureBackendCampsiteId = async () => {
    try {
      // 1) Try search existing campsite by name
      const res = await api.get('/campsites', { params: { search: campsite.name, limit: 5 } });
      const rows = Array.isArray(res.data) ? res.data : [];
      // Validate match to avoid wrong associations (e.g., always returning Manali)
      const [latCreate, lonCreate] = campsite.coordinates || [];
      const exact = rows.find(r => {
        const nameOk = (r.name || '').toLowerCase() === (campsite.name || '').toLowerCase();
        const locOk = (r.location || '').toLowerCase() === (campsite.location || '').toLowerCase();
        const latOk = typeof latCreate === 'number' && typeof r.lat === 'number' ? Math.abs(r.lat - latCreate) < 0.01 : true;
        const lonOk = typeof lonCreate === 'number' && typeof r.lon === 'number' ? Math.abs(r.lon - lonCreate) < 0.01 : true;
        return nameOk && (locOk || (latOk && lonOk));
      });
      if (exact?._id) return exact._id;
      // 2) Create campsite if not found (requires auth)
      const urls = (campsite.images || []).map(it => typeof it === 'string' ? it : it?.url).filter(Boolean).slice(0, 5);
      const payload = {
        name: campsite.name,
        location: campsite.location,
        lat: typeof latCreate === 'number' ? latCreate : undefined,
        lon: typeof lonCreate === 'number' ? lonCreate : undefined,
        images: urls,
        description: campsite.description || '',
        tags: campsite.tags || []
      };
      const created = await api.post('/campsites', payload);
      return created?.data?._id;
    } catch (e) {
      return null;
    }
  };

  const handleBook = async () => {
    setSubmitError('');
    if (!checkIn || !checkOut || differenceInCalendarDays(checkOut, checkIn) <= 0) {
      setSubmitError('Please select a valid date range.');
      return;
    }
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      setSubmitting(true);
      const backendCampsiteId = await ensureBackendCampsiteId();
      const payload = {
        campsiteId: backendCampsiteId,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests,
      };
      const { data } = await api.post('/bookings', payload);
      setConfirm({
        id: data._id || `local-${Date.now()}`,
        checkIn,
        checkOut,
        guests,
        payment,
      });
    } catch (e) {
      // Fallback: save a local pending booking if backend is unavailable or request fails
      const localId = `local-${Date.now()}`;
      const local = { id: localId, campsiteId: campsite.id, checkIn, checkOut, guests, payment, status: 'pending' };
      try {
        const list = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
        list.push(local);
        localStorage.setItem('pending_bookings', JSON.stringify(list));
      } catch {}
      setConfirm({ id: localId, checkIn, checkOut, guests, payment });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="campsite-detail-page navbar-offset">
      <Container className="campsite-detail-container">
        <Row className="mb-4">
          <Col md={8}>
            <Card className="campsite-gallery-card position-relative">
            <div style={{ width: '100%', height: '420px', overflow: 'hidden' }}>
              {images.length > 1 ? (
                <Carousel showThumbs={true} infiniteLoop={true} dynamicHeight={false} showStatus={false} emulateTouch={true} onChange={(idx) => setCurrentSlide(idx)}>
                  {images.map((img, idx) => (
                    <div key={idx} onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }} style={{ cursor: 'zoom-in', position: 'relative' }}>
                      {!loadedMap[idx] && (
                        <div style={{ position:'absolute', inset:0, background:'#f1f3f5' }} />
                      )}
                      <img
                        src={img}
                        alt={`${campsite.name} ${idx+1}`}
                        loading="lazy"
                        onLoad={() => onImgLoad(idx)}
                        style={{ objectFit: 'cover', width: '100%', height: '420px' }}
                      />
                      <div className="text-white" style={{ position:'absolute', left:12, bottom:12, background:'rgba(0,0,0,0.45)', padding:'6px 10px', borderRadius:8, fontSize:12 }}>
                        {getCaption(idx)}
                      </div>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <div onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }} style={{ cursor: 'zoom-in', position:'relative' }}>
                  {!loadedMap[0] && (
                    <div style={{ position:'absolute', inset:0, background:'#f1f3f5' }} />
                  )}
                  {images[0] && (
                    <img
                      src={images[0]}
                      alt={campsite.name}
                      loading="lazy"
                      onLoad={() => onImgLoad(0)}
                      style={{ objectFit: 'cover', width: '100%', height: '420px' }}
                    />
                  )}
                  <div className="text-white" style={{ position:'absolute', left:12, bottom:12, background:'rgba(0,0,0,0.45)', padding:'6px 10px', borderRadius:8, fontSize:12 }}>
                    {getCaption(0)}
                  </div>
                </div>
              )}
            </div>
            {images.length > 0 && (
              <Button
                variant="dark"
                size="sm"
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
                style={{ position:'absolute', right:12, top:12, opacity:0.85 }}
              >
                Fullscreen
              </Button>
            )}
            {images.length > 1 && (
              <Button
                variant="light"
                size="sm"
                onClick={() => { setLightboxIndex(currentSlide || 0); setLightboxOpen(true); }}
                style={{ position:'absolute', right:12, top:48, opacity:0.9 }}
              >
                View all photos ({images.length})
              </Button>
            )}
            <Card.Body className="campsite-info-body">
              {(getCredit(currentSlide) || getCredit(0)) && (
                <div className="mb-2 small text-muted" style={{ marginTop: -8 }}>
                  Credit: {getCredit(currentSlide) || getCredit(0)}
                </div>
              )}
              <Card.Title className="campsite-title">{campsite.name}</Card.Title>
              <Card.Text className="campsite-description">{campsite.description}</Card.Text>
              <div className="campsite-tags">
                {(campsite.tags || []).map((t) => (
                  <Badge key={t} className="campsite-tag">{t}</Badge>
                ))}
              </div>
              <div className="campsite-location"><strong>Location:</strong> {campsite.location}</div>
            </Card.Body>
          </Card>

          <Card className="map-card">
            <Card.Body className="map-card-body">
              <Card.Title className="map-title">Live Map</Card.Title>
              {lat && lon ? (
                <MapContainer center={[lat, lon]} zoom={10} style={{ height: 400, width: '100%' }} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[lat, lon]}>
                    <Popup>
                      {campsite.name}
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <Alert variant="secondary">No coordinates available for map.</Alert>
              )}
            </Card.Body>
          </Card>

          {/* Reviews Section */}
          <Card className="reviews-card">
            <Card.Body className="reviews-card-body">
              {/* Debug Info */}
              <div className="reviews-debug-info">
                <small>
                  <strong>Debug Info:</strong><br/>
                  Frontend Campsite: {campsite.name} ({campsite.location})<br/>
                  Backend Campsite ID: {backendCampsiteId || 'Not found'}<br/>
                  User: {user ? user.username : 'Not logged in'}
                </small>
              </div>
              
              {backendCampsiteId ? (
                <ReviewList 
                  campsiteId={backendCampsiteId}
                  onReviewsUpdate={fetchBackendCampsiteId}
                />
              ) : (
                <div className="reviews-empty-state">
                  <h3 className="reviews-title">Reviews</h3>
                  {user ? (
                    <Alert variant="info">
                      <Alert.Heading>Be the first to review!</Alert.Heading>
                      <p>This campsite hasn't been added to our database yet. You can be the first to add it and write a review!</p>
                      <Button 
                        className="add-campsite-btn"
                        onClick={createBackendCampsite}
                        disabled={!user}
                      >
                        Add Campsite & Write Review
                      </Button>
                      <div className="mt-2">
                        <small className="text-muted">
                          Debug: Looking for campsite "{campsite.name}" in "{campsite.location}"
                        </small>
                      </div>
                    </Alert>
                  ) : (
                    <Alert variant="secondary">
                      <Alert.Heading>Reviews</Alert.Heading>
                      <p>No reviews yet for this campsite. Please <Button variant="link" onClick={() => navigate('/login')} className="p-0">login</Button> to add this campsite and write the first review!</p>
                    </Alert>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="sidebar-card">
            <Card.Body className="sidebar-card-body">
              <Card.Title className="sidebar-card-title">Live Weather</Card.Title>
              {weather.loading && (
                <div className="d-flex align-items-center"><Spinner size="sm" className="me-2" /> Loading weather...</div>
              )}
              {!weather.loading && weather.ok && (
                <div>
                  <div className="weather-temp">{kToC(weather.data.main.temp)}°C</div>
                  <div className="weather-description">{weather.data.weather?.[0]?.description || 'N/A'}</div>
                  <div className="weather-details">
                    Humidity: {weather.data.main.humidity}% • Wind: {weather.data.wind.speed} m/s
                  </div>
                  {weather.mock && (
                    <Alert variant="info" className="mt-3">
                      Using mock weather. Add REACT_APP_WEATHER_API_KEY to enable live data. See WEATHER_SETUP.md
                    </Alert>
                  )}
                </div>
              )}
              {!weather.loading && !weather.ok && (
                <Alert variant="warning">Weather unavailable: {weather.reason}</Alert>
              )}
            </Card.Body>
          </Card>

          <Card className="sidebar-card">
            <Card.Body className="sidebar-card-body">
              <Card.Title className="sidebar-card-title">Book Your Stay</Card.Title>
              <div className="booking-section">
                <small className="booking-dates-label">Select dates</small>
                <div className="date-range-picker">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setBookingRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={bookingRange}
                    minDate={new Date()}
                    locale={enUS}
                    rangeColors={["#2c5b3d"]}
                  />
                </div>
              </div>
              <Form.Group className="booking-form-group">
                <Form.Label className="booking-form-label">Guests</Form.Label>
                <Form.Select 
                  value={guests} 
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="booking-form-select"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={5}>5+ Guests</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="booking-form-group">
                <Form.Label className="booking-form-label">Payment</Form.Label>
                <div className="booking-radio-group">
                  <Form.Check
                    type="radio"
                    name="payment"
                    id="pay_on_arrival"
                    label="Pay on arrival"
                    value="pay_on_arrival"
                    checked={payment === 'pay_on_arrival'}
                    onChange={(e) => setPayment(e.target.value)}
                    className="booking-radio"
                  />
                  <Form.Check
                    type="radio"
                    name="payment"
                    id="card"
                    label="Card (coming soon)"
                    value="card"
                    disabled
                    checked={payment === 'card'}
                    onChange={(e) => setPayment(e.target.value)}
                    className="booking-radio"
                  />
                </div>
              </Form.Group>
              <div className="booking-summary">
                <small className="booking-summary-text">{nights} night(s) at ${pricePerNight}/night</small>
                <div className="booking-total">Total: ${total}</div>
              </div>
              {submitError && <Alert variant="warning" className="py-2">{submitError}</Alert>}
              <Button className="booking-btn" disabled={submitting} onClick={handleBook}>
                {submitting ? 'Booking...' : 'Book Now'}
              </Button>
              <div className="text-center mt-2">
                <Button variant="link" size="sm" onClick={() => navigate('/')} className="back-to-search-btn">
                  Back to Search
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Booking confirmation modal */}
      <Modal show={!!confirm} onHide={() => setConfirm(null)} centered className="booking-modal">
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1"><strong>Campsite:</strong> {campsite.name}</p>
          <p className="mb-1"><strong>Dates:</strong> {format(checkIn, 'dd MMM yyyy')} – {format(checkOut, 'dd MMM yyyy')}</p>
          <p className="mb-1"><strong>Guests:</strong> {confirm?.guests}</p>
          <p className="mb-3"><strong>Payment:</strong> {confirm?.payment === 'pay_on_arrival' ? 'Pay on arrival' : 'Card'}</p>
          <Alert variant="success" className="mb-0">Your booking ID: {confirm?.id}</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirm(null)}>Close</Button>
          <Button onClick={() => { setConfirm(null); navigate('/bookings'); }}>View My Bookings</Button>
        </Modal.Footer>
      </Modal>

      {/* Lightbox modal for images */}
      <Modal show={lightboxOpen} onHide={() => setLightboxOpen(false)} centered size="lg" className="lightbox-modal">
        <Modal.Header closeButton>
          <Modal.Title>{getCaption(lightboxIndex)}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {images[lightboxIndex] && (
            <img 
              src={images[lightboxIndex]} 
              alt={getCaption(lightboxIndex)} 
              className="lightbox-image"
            />
          )}
        </Modal.Body>
        {images.length > 1 && (
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}>Prev</Button>
            <div className="text-muted" style={{ fontSize: 12 }}>{lightboxIndex + 1} / {images.length}</div>
            <Button onClick={() => setLightboxIndex((lightboxIndex + 1) % images.length)}>Next</Button>
          </Modal.Footer>
        )}
      </Modal>
      </Container>
    </div>
  );
};
export default CampsiteDetail;
