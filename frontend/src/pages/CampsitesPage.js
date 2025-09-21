import React, { useMemo, useState, useEffect, Suspense, lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup, Button, Alert, Spinner } from 'react-bootstrap';
import api from '../api';
import { FaSearch, FaMapMarkerAlt, FaFilter } from 'react-icons/fa';
import './CampsitesPage.css';

const CampsiteList = lazy(() => import('../components/CampsiteList'));

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const CampsitesPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [term, setTerm] = useState(query.get('search') || '');
  const [region, setRegion] = useState('All');
  const [sort, setSort] = useState('az');
  const [campsitesData, setCampsitesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch campsites from API
  useEffect(() => {
    const fetchCampsites = async () => {
      try {
        setLoading(true);
        const response = await api.get('/campsites?limit=100');
        setCampsitesData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching campsites:', err);
        setError('Failed to load campsites. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampsites();
  }, []);

  useEffect(() => {
    setTerm(query.get('search') || '');
  }, [query]);

  const detectRegion = (c) => {
    const loc = (c.location || '').toLowerCase();
    const isIndia = /india|uttarakhand|kerala|tamil nadu|himachal/i.test(c.location || '');
    const isUSA = /usa|united states|california|wyoming|utah|arizona|tennessee|north carolina|washington|maine|colorado|virginia/i.test(c.location || '');
    const europeCountries = ['switzerland','france','italy','croatia','slovenia','spain'];
    const isEurope = europeCountries.some(cty => loc.includes(cty));
    if (isIndia) return 'India';
    if (isUSA) return 'USA';
    if (isEurope) return 'Europe';
    return 'Other';
  };

  const filtered = useMemo(() => {
    const q = (term || '').toLowerCase().trim();
    let list = campsitesData.filter(c =>
      q ? (c.name.toLowerCase().includes(q) || (c.location || '').toLowerCase().includes(q)) : true
    );

    if (region !== 'All') {
      list = list.filter(c => detectRegion(c) === region);
    }

    list = list.slice().sort((a, b) => {
      if (sort === 'az') return a.name.localeCompare(b.name);
      if (sort === 'za') return b.name.localeCompare(a.name);
      return 0;
    });

    return list;
  }, [term, region, sort]);

  const onSubmit = (e) => {
    e.preventDefault();
    
    // If user searches for a specific campsite, navigate directly to it
    if (term && term.trim()) {
      const searchTerm = term.toLowerCase().trim();
      const exactMatch = campsitesData.find(c => 
        c.name.toLowerCase() === searchTerm
      );
      const partialMatch = campsitesData.find(c => 
        c.name.toLowerCase().includes(searchTerm) || 
        (c.location || '').toLowerCase().includes(searchTerm)
      );
      
      const targetCampsite = exactMatch || partialMatch;
      
      if (targetCampsite) {
        navigate(`/campsite/${targetCampsite._id || targetCampsite.id}`);
        return;
      }
    }
    
    const next = term ? `/campsites?search=${encodeURIComponent(term)}` : '/campsites';
    navigate(next, { replace: false });
  };

  return (
    <div className="campsites-page navbar-offset">
      <Container className="campsites-container">
        {/* Header Section */}
        <div className="campsites-header">
          <h1 className="campsites-title">
            <FaMapMarkerAlt />
            Explore Campsites
          </h1>
          <p className="campsites-subtitle">
            Discover amazing camping destinations around the world
          </p>
        </div>

        {/* Search & Filters Section */}
        <div className="search-filters-section">
          <Form onSubmit={onSubmit} className="search-form">
            <Row className="align-items-end">
              <Col md={6}>
                <InputGroup className="search-input-group">
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search by name or location..."
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  />
                  <Button type="submit" className="search-btn">
                    Search
                  </Button>
                </InputGroup>
              </Col>
              <Col md={3} className="mt-3 mt-md-0">
                <Form.Label className="filter-label">
                  <FaFilter className="me-1" />
                  Region
                </Form.Label>
                <Form.Select 
                  value={region} 
                  onChange={(e) => setRegion(e.target.value)}
                  className="filter-select"
                >
                  <option>All Regions</option>
                  <option>USA</option>
                  <option>Europe</option>
                  <option>India</option>
                  <option>Other</option>
                </Form.Select>
              </Col>
              <Col md={3} className="mt-3 mt-md-0">
                <Form.Label className="filter-label">Sort By</Form.Label>
                <Form.Select 
                  value={sort} 
                  onChange={(e) => setSort(e.target.value)}
                  className="filter-select"
                >
                  <option value="az">Name A–Z</option>
                  <option value="za">Name Z–A</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state text-center py-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-3">Loading campsites...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="danger" className="my-4">
            <Alert.Heading>Oops! Something went wrong</Alert.Heading>
            <p>{error}</p>
            <Button 
              variant="outline-danger" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </Alert>
        )}

        {/* Results Section */}
        {!loading && !error && (
          <div className="results-section">
          <div className="results-header">
            <div className="results-count">
              {filtered.length} {filtered.length === 1 ? 'campsite' : 'campsites'} found
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <svg width="140" height="120" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <g fill="none" fillRule="evenodd">
                  <path d="M10 100h120" stroke="#e1e8e4" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M40 95L70 40l30 55z" fill="#f7f9f7" stroke="#2c5b3d" strokeWidth="2"/>
                  <circle cx="90" cy="78" r="6" fill="#2c5b3d"/>
                </g>
              </svg>
              <h5>No campsites match your search</h5>
              <p>Try adjusting your search terms or filters to find more results.</p>
              {term && (
                <div>
                  <p className="text-muted">
                    Searched for: "<strong>{term}</strong>"
                  </p>
                  {(() => {
                    const suggestions = campsitesData
                      .filter(c => 
                        c.name.toLowerCase().includes(term.toLowerCase().substring(0, 3)) ||
                        (c.location || '').toLowerCase().includes(term.toLowerCase().substring(0, 3))
                      )
                      .slice(0, 3);
                    
                    if (suggestions.length > 0) {
                      return (
                        <div className="mt-3">
                          <p className="mb-2"><strong>Did you mean:</strong></p>
                          {suggestions.map(campsite => (
                            <Button
                              key={campsite._id || campsite.id}
                              variant="outline-success"
                              size="sm"
                              className="me-2 mb-2"
                              onClick={() => navigate(`/campsite/${campsite._id || campsite.id}`)}
                            >
                              {campsite.name}
                            </Button>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}
              <Button 
                className="clear-filters-btn"
                onClick={() => { 
                  setTerm(''); 
                  setRegion('All'); 
                  setSort('az'); 
                  navigate('/campsites', { replace: true }); 
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <Suspense fallback={
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading campsites...</p>
              </div>
            }>
              <CampsiteList
                campsites={filtered}
                onSelect={(c) => navigate(`/campsite/${c._id || c.id}`)}
              />
            </Suspense>
          )}
        </div>
        )}
      </Container>
    </div>
  );
};

export default CampsitesPage;
