import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// Using more specific and modern icons
import { FaArrowRight, FaCalendarAlt, FaMoon, FaUserFriends, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../api';
import './BookingsPage.css'; // Make sure this CSS file is imported
import campsites from './campsites';

// Skeleton Card component for a better loading experience
const SkeletonCard = () => (
  <Col md={6} lg={4}>
    <div className="booking-card-skeleton">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton-body">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    </div>
  </Col>
);

const BookingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  // Function to calculate the number of nights
  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const timeDiff = end.getTime() - start.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return nights > 0 ? nights : 1; // Ensure at least 1 night is shown
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await api.get('/bookings/me');
        const serverBookings = Array.isArray(res.data) ? res.data : [];
        
        let local = [];
        try {
          local = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
        } catch {}

        const localAsBookings = local.map(lb => {
          const campsiteResolved = campsites.find(c => String(c.id) === String(lb.campsiteId));
          return {
            _id: lb.id,
            status: 'pending',
            checkIn: lb.checkIn,
            checkOut: lb.checkOut,
            guests: lb.guests,
            campsite: campsiteResolved || { _id: lb.campsiteId, name: 'Unknown Campsite' },
          };
        });

        if (!mounted) return;
        setBookings([...localAsBookings, ...serverBookings]);
      } catch (e) {
        if (!mounted) return;
        if (e?.response?.status === 401) {
          setError('Please log in to view your bookings.');
        } else {
          setError('An error occurred while loading your bookings.');
        }
        // Even if server failed, still show local pending bookings
        try {
          const local = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
          const localAsBookings = local.map(lb => {
            const campsiteResolved = campsites.find(c => String(c.id) === String(lb.campsiteId));
            return {
              _id: lb.id,
              status: 'pending',
              checkIn: lb.checkIn,
              checkOut: lb.checkOut,
              guests: lb.guests,
              campsite: campsiteResolved || { _id: lb.campsiteId, name: 'Unknown Campsite' },
            };
          });
          setBookings(localAsBookings);
        } catch {
          setBookings([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      await api.delete(`/bookings/${bookingId}`);
    } catch (e) {
      try {
        await api.post(`/bookings/${bookingId}/cancel`);
      } catch (e2) {}
    } finally {
      setBookings(prev => prev.filter(b => b._id !== bookingId));
      try {
        const list = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
        const next = list.filter(b => b.id !== bookingId);
        localStorage.setItem('pending_bookings', JSON.stringify(next));
      } catch {}
    }
  };

  if (loading) {
    return (
      <Container className="bookings-page navbar-offset py-5">
        <div className="booking-header mb-4">
          <h2 className="mb-1">My Adventures</h2>
          <div className="text-light">Loading your reservations...</div>
        </div>
        <Row className="g-4">
          {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
        </Row>
      </Container>
    );
  }

  return (
    <Container className="bookings-page navbar-offset py-5">
      <div className="booking-header d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="mb-1">My Adventures</h2>
          <div className="text-light">All your campsite reservations at a glance</div>
        </div>
        <Button variant="primary" onClick={() => navigate('/campsites')}>
          Plan a New Trip <FaArrowRight className="ms-2" />
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="d-flex justify-content-between align-items-center">
          {error}
          <Button as={Link} to="/login" variant="outline-danger" size="sm">Login</Button>
        </Alert>
      )}

      {!error && bookings.length === 0 && (
        <div className="empty-state text-center p-5">
          <div className="empty-state-illustration mb-4" />
          <h4 className="mb-2">Your map is empty!</h4>
          <p className="text-light mb-4">It's time to book your next great escape.</p>
          <Button variant="primary" size="lg" onClick={() => navigate('/campsites')}>
            Find Your Next Campsite
          </Button>
        </div>
      )}

      <Row className="g-4">
        {bookings.map((b) => {
          const campsiteImage = b.campsite?.images?.[0]?.url || b.campsite?.coverImage;
          const statusVariant = {
            cancelled: 'secondary',
            pending: 'warning',
            confirmed: 'success',
          }[b.status] || 'success';

          return (
            <Col md={6} lg={4} key={b._id}>
              <Card className="booking-card h-100">
                <div className="image-wrapper">
                  {campsiteImage ? (
                    <img src={campsiteImage} alt={b.campsite?.name} />
                  ) : (
                    <div className="img-fallback">{b.campsite?.name?.[0] || 'C'}</div>
                  )}
                  <Badge pill bg={statusVariant} className="status-badge">
                    {b.status || 'confirmed'}
                  </Badge>
                </div>
                
                <Card.Body>
                  <Card.Title>{b.campsite?.name || 'Campsite'}</Card.Title>
                  <div className="location">
                    <FaMapMarkerAlt /> 
                    <span>{b.campsite?.location || 'Unknown Location'}</span>
                  </div>
                  
                  <div className="details-section">
                    <div className="detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <div>
                        <div className="detail-text">Check-in</div>
                        <div className="detail-value">{new Date(b.checkIn).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="detail-item">
                      <FaMoon className="detail-icon" />
                      <div>
                        <div className="detail-text">Nights</div>
                        <div className="detail-value">{calculateNights(b.checkIn, b.checkOut)}</div>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <FaUserFriends className="detail-icon" />
                      <div>
                        <div className="detail-text">Guests</div>
                        <div className="detail-value">{b.guests}</div>
                      </div>
                    </div>
                  </div>
                </Card.Body>

                <Card.Footer>
                  <Button variant="outline-secondary" size="sm" onClick={() => navigate(`/campsite/${b.campsite?._id || b.campsite}`)}>
                    View Details
                  </Button>
                  {b.status !== 'cancelled' && (
                    <Button variant="outline-danger" size="sm" onClick={() => handleCancel(b._id)}>
                      Cancel
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default BookingsPage;