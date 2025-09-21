import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { DateRange } from 'react-date-range';
import { addDays, format } from 'date-fns';
import { enUS } from 'date-fns/locale';

// --- Import Icons ---
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaSearch, FaTree, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

// --- Import Styles for Date Picker ---
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// --- Import Your Assets ---
import './HomePage.css';
import campsite1 from '../assets/campsite1.jpg';
import campsite2 from '../assets/campsite2.jpg';
import campsite3 from '../assets/campsite3.jpg';
import allCampsites from './campsites';


// Custom Hook to detect clicks outside a component
const useClickOutside = (handler) => {
    let domNode = useRef();

    useEffect(() => {
        const maybeHandler = (event) => {
            if (domNode.current && !domNode.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", maybeHandler);

        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    });

    return domNode;
};

// Custom Hook for Intersection Observer (for scroll animations)
const useIntersectionObserver = (options) => {
    const [elements, setElements] = useState([]);
    const [entries, setEntries] = useState([]);
    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(observedEntries => {
            setEntries(observedEntries);
        }, options);

        const { current: currentObserver } = observer;
        elements.forEach(element => currentObserver.observe(element));

        return () => currentObserver.disconnect();
    }, [elements, options]);

    return [setElements, entries];
};


const HomePage = () => {
    const navigate = useNavigate();
    const [searchLocation, setSearchLocation] = useState('');
    const [searchGuests, setSearchGuests] = useState('');
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);

    // --- State and Refs for Date Range Picker ---
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const datePickerRef = useClickOutside(() => setShowDatePicker(false));
    const locationInputRef = useClickOutside(() => setShowLocationSuggestions(false));


    // --- Animate on Scroll Logic ---
    const [setElements, entries] = useIntersectionObserver({ threshold: 0.2, rootMargin: '0px' });
    
    useEffect(() => {
        const sections = document.querySelectorAll('.animate-on-scroll');
        setElements(Array.from(sections));
    }, [setElements]);

    useEffect(() => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, [entries]);


    // --- Get camping locations from campsiteData ---
    const campsites = allCampsites;

    const handleLocationChange = (e) => {
        const value = e.target.value;
        setSearchLocation(value);

        if (!value.trim()) {
            setShowLocationSuggestions(false);
            setFilteredLocations([]);
            setActiveSuggestion(-1);
            return;
        }

        const q = value.toLowerCase();
        const matches = campsites
            .filter(c =>
                c.name.toLowerCase().includes(q) ||
                (c.location || '').toLowerCase().includes(q)
            )
            .slice(0, 6);
        setFilteredLocations(matches);
        setShowLocationSuggestions(matches.length > 0);
        setActiveSuggestion(matches.length ? 0 : -1);
    };

    const handleLocationSelect = async (locOrCampsite) => {
        // Support receiving either a string or a campsite object
        if (typeof locOrCampsite === 'string') {
            const q = locOrCampsite.toLowerCase();
            const exact = campsites.find(c => c.name.toLowerCase() === q);
            const starts = exact || campsites.find(c => c.name.toLowerCase().startsWith(q));
            const includes = starts || campsites.find(c => c.name.toLowerCase().includes(q) || (c.location||'').toLowerCase().includes(q));
            const target = exact || starts || includes;
            if (target) {
                setSearchLocation(target.name);
                setShowLocationSuggestions(false);
                setActiveSuggestion(-1);
                navigate(`/campsite/${target.id}`);
                return;
            }
            // fallback
            navigate('/about');
            return;
        }
        const campsite = locOrCampsite;
        setSearchLocation(campsite.name);
        setShowLocationSuggestions(false);
        setActiveSuggestion(-1);
        navigate(`/campsite/${campsite.id}`);
    };
    
    const handleSearch = async () => {
        const q = String(searchLocation || '').trim();
        if (!q) { navigate('/about'); return; }
        const lower = q.toLowerCase();
        const exact = campsites.find(c => c.name.toLowerCase() === lower);
        const starts = exact || campsites.find(c => c.name.toLowerCase().startsWith(lower));
        const includes = starts || campsites.find(c => c.name.toLowerCase().includes(lower) || (c.location||'').toLowerCase().includes(lower));
        const target = exact || starts || includes;
        if (target) {
            navigate(`/campsite/${target.id}`);
        } else {
            navigate('/about');
        }
    };

    const handleKeyDown = (e) => {
        if (!showLocationSuggestions || filteredLocations.length === 0) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestion((prev) => (prev + 1) % filteredLocations.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestion((prev) => (prev - 1 + filteredLocations.length) % filteredLocations.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const choice = filteredLocations[activeSuggestion >= 0 ? activeSuggestion : 0];
            if (choice) handleLocationSelect(choice);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setShowLocationSuggestions(false);
            setActiveSuggestion(-1);
        }
    };
    

    const whyChooseUsData = [
        { icon: <FaTree />, title: 'Vast Selection', text: 'Explore thousands of unique campsites worldwide 🌍' },
        { icon: <FaCheckCircle />, title: 'Verified Listings', text: 'Every campsite is checked for quality & safety ✨' },
        { icon: <FaShieldAlt />, title: 'Secure Booking', text: 'Book your next adventure with complete confidence 🔒' }
    ];

    const popularDestinations = [
        { id: 1, name: "Yosemite Valley, CA", image: campsite1, campgrounds: 45 },
        { id: 2, name: "Zion National Park, UT", image: campsite2, campgrounds: 32 },
        { id: 3, name: "Moab, UT", image: campsite3, campgrounds: 51 },
    ];

    const recommendedCampsites = [
        { id: 1, name: "Pine Ridge Retreat", rating: 4.8, price: "Rs 4500/night", description: "A peaceful forest setting with hiking trails 🌲", image: campsite1, tags: ['Hiking', 'Pet-Friendly'] },
        { id: 2, name: "Crystal Lake Getaway", rating: 4.9, price: "Rs 6500/night", description: "Stunning lakeside views perfect for water sports 🌊", image: campsite2, tags: ['Lakeside', 'Kayaking'] },
        { id: 3, name: "Starlight Desert Camp", rating: 4.7, price: "Rs 5500/night", description: "Unparalleled stargazing in the vast desert 🌌", image: campsite3, tags: ['Stargazing', 'Unique'] }
    ];
    
    const formattedStartDate = format(dateRange[0].startDate, "MMM dd");
    const formattedEndDate = format(dateRange[0].endDate, "MMM dd, yyyy");


    return (
        <div className="home-page">
            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-background"></div>
                <Container className="hero-content text-center">
                    <h1 className="hero-title">Find Your 🌲 Wild</h1>
                    <p className="hero-subtitle">Book campsites, chase sunsets, live unforgettable moments ✨</p>

                    {/* Search Bar */}
                    <Card className="search-card">
                        <Card.Body>
                            <Row className="align-items-center g-3">
                                <Col md={4} className="position-relative" ref={locationInputRef}>
                                    <div className="search-input-group">
                                        <FaMapMarkerAlt className=" search-icon" />
                                        <Form.Control
                                            type="text"
                                            placeholder="    Where to?"
                                            value={searchLocation}
                                            onChange={handleLocationChange}
                                            onFocus={() => searchLocation.length > 0 && setShowLocationSuggestions(true)}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </div>
                                    {showLocationSuggestions && filteredLocations.length > 0 && (
                                        <div className="suggestions-dropdown">
                                            {filteredLocations.map((cs, idx) => (
                                                <div key={cs.id} className={`suggestion-item ${idx === activeSuggestion ? 'active' : ''}`} onClick={() => handleLocationSelect(cs)}>
                                                    <strong>{cs.name}</strong>
                                                    <div className="small text-muted">{cs.location}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Col>
                                <Col md={4} className="position-relative" ref={datePickerRef}>
                                    <div className="search-input-group" onClick={() => setShowDatePicker(!showDatePicker)}>
                                        <FaCalendarAlt className="search-icon" />
                                        <div className="form-control date-display">
                                            <span>{`${formattedStartDate} - ${formattedEndDate}`}</span>
                                        </div>
                                    </div>
                                    {showDatePicker && (
                                        <div className="date-picker-container">
                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={item => setDateRange([item.selection])}
                                                moveRangeOnFirstSelection={false}
                                                ranges={dateRange}
                                                minDate={new Date()}
                                                locale={enUS}
                                                rangeColors={['#2a9d8f']}
                                            />
                                        </div>
                                    )}
                                </Col>
                                <Col md={2}>
                                    <div className="search-input-group">
                                        <FaUserFriends className="search-icon" />
                                        <Form.Select
                                            value={searchGuests}
                                            onChange={(e) => setSearchGuests(e.target.value)}
                                        >
                                            <option value="">Guests</option>
                                            <option value="1-2">1-2</option>
                                            <option value="3-4">3-4</option>
                                            <option value="5+">5+</option>
                                        </Form.Select>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <Button className="search-button w-100" onClick={handleSearch}>
                                        <FaSearch className="me-1" /> Search
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </header>

            {/* Why Choose Us Section */}
            <section className="why-choose-us-section animate-on-scroll">
                <Container>
                    <h2 className="section-title">Why Book With Wildr?</h2>
                    <Row>
                        {whyChooseUsData.map((feature, index) => (
                            <Col md={4} key={index} className="text-center mb-4">
                                <div className="feature-item" style={{'--animation-delay': `${index * 150}ms`}}>
                                    <div className="feature-icon">{feature.icon}</div>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-text">{feature.text}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Popular Destinations Section */}
            <section className="destinations-section animate-on-scroll">
                <Container>
                    <h2 className="section-title">Popular Destinations ✈️</h2>
                    <Row>
                        {popularDestinations.map((dest, index) => (
                            <Col md={4} key={dest.id} className="mb-4">
                                <Card className="content-card destination-card" style={{'--animation-delay': `${index * 150}ms`}} onClick={() => navigate(`/campsites?search=${encodeURIComponent(dest.name)}`)}>
                                    <Card.Img variant="top" src={dest.image} alt={dest.name} className="card-image"/>
                                    <div className="card-image-overlay"></div>
                                    <Card.Body>
                                        <Card.Title>{dest.name}</Card.Title>
                                        <Card.Text>{dest.campgrounds} campgrounds</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            
            {/* Recommended Campsites Section */}
            <section className="recommended-section animate-on-scroll">
                <Container>
                    <h2 className="section-title">Top Rated Campsites ⭐</h2>
                     <Row>
                        {recommendedCampsites.map((site, index) => (
                            <Col md={4} key={site.id} className="mb-4">
                                <Card className="content-card campsite-card" style={{'--animation-delay': `${index * 150}ms`}}>
                                    <div className="card-img-container">
                                        <Card.Img variant="top" src={site.image} alt={site.name} className="card-image"/>
                                        <span className="rating">★ {site.rating}</span>
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{site.name}</Card.Title>
                                        <Card.Text>{site.description}</Card.Text>
                                        <div className="tags-container mb-3">
                                            {site.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <span className="price">{site.price}</span>
                                            <Button className="view-button" size="sm" onClick={() => navigate(`/campsite/${site.id}`)}>
                                                View Details
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section animate-on-scroll">
                <Container className="d-flex flex-column align-items-center justify-content-center text-center text-white">
                    <h2>Your Next Adventure is Calling 🌄</h2>
                    <p className="mb-4">Don't wait. The great outdoors is ready for you.</p>
                    <Button className="cta-button" size="lg" onClick={() => navigate('/campsites')}>
                        Explore Campsites
                    </Button>
                </Container>
            </section>
        </div>
    );
};

export default HomePage;