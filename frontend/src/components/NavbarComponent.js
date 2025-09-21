import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FiSun, FiMoon, FiMapPin, FiCompass } from 'react-icons/fi';
import { FaUser, FaUserCircle, FaTachometerAlt, FaSignOutAlt, FaTree, FaMountain, FaCampground } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const NavbarComponent = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  
  // States for scroll behavior
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  // Set theme on initial load and when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Refined hide-on-scroll logic
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20); // Add background when scrolled past 20px
      // Hide only if scrolling down and not near the top
      setHidden(y > lastY.current && y > 150);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const navLinks = [
    { path: "/campsites", name: "Campsites", icon: <FaMountain /> },
    ...(user ? [
      { path: "/add-campsite", name: "Add Campsite", icon: <FaCampground /> },
      { path: "/bookings", name: "My Bookings", icon: <FiMapPin /> }
    ] : []),
    { path: "/about", name: "About", icon: <FiCompass /> }
  ];

  return (
    <>
      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''} ${hidden ? 'navbar-hidden' : ''}`}
        collapseOnSelect // Auto-collapse on item selection for mobile
      >
        <Navbar.Brand as={Link} to="/" className="brand-text">
          <FaTree className="brand-icon" />
          Wildr
        </Navbar.Brand>
        
        {/* Theme toggle moved next to brand for better mobile layout */}
        <div className="d-flex align-items-center ms-auto d-lg-none">
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
            <AnimatePresence initial={false}>
              <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </motion.div>
            </AnimatePresence>
          </button>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </div>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto nav-links">
            {navLinks.map(link => (
              <Nav.Link as={NavLink} to={link.path} key={link.path} end className="nav-link-with-icon">
                <span className="nav-link-icon">{link.icon}</span>
                <span className="nav-link-text">{link.name}</span>
                {location.pathname === link.path && (
                  <motion.div className="active-link-indicator" layoutId="active-indicator" />
                )}
              </Nav.Link>
            ))}
          </Nav>
          
          <Nav className="align-items-center gap-3 nav-actions">
            <button onClick={toggleTheme} className="theme-toggle-btn d-none d-lg-flex" aria-label="Toggle theme">
              <AnimatePresence initial={false}>
                <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {theme === 'dark' ? <FiSun /> : <FiMoon />}
                </motion.div>
              </AnimatePresence>
            </button>

            {user ? (
              <Dropdown>
                <Dropdown.Toggle id="user-dropdown" className="user-toggle">
                  <FaUser className="me-2" /> {user.username || user.email}
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-dropdown-menu">
                  <Dropdown.Item as={Link} to="/dashboard"><FaTachometerAlt className="me-2"/> Dashboard</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/profile"><FaUserCircle className="me-2"/> Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}><FaSignOutAlt className="me-2"/> Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login" className="cta-link">Login / Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarComponent;