import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FiUser, FiMail, FiLock, FiLogIn, FiUserPlus } from 'react-icons/fi';
import './LoginSignupPage.css';

const LoginSignupPage = () => {
  const navigate = useNavigate();
  const { login, register, user } = useAuth();
  
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
    setErrors({});
    setMessage({ type: '', text: '' });
    setFormData({ username: '', email: '', password: '' });
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    setErrors({});
    setMessage({ type: '', text: '' });
    setFormData({ username: '', email: '', password: '' });
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear message
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation (for signup)
    if (isRightPanelActive) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      if (isRightPanelActive) {
        // Register
        await register(formData.username, formData.email, formData.password);
        setMessage({ type: 'success', text: 'Account created successfully!' });
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        // Login
        await login(formData.username, formData.password);
        setMessage({ type: 'success', text: 'Login successful!' });
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Authentication failed. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div 
        className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`} 
        id="container"
      >
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleFormSubmit} className="auth-form">
            <h1 className="auth-title">Create Account</h1>
            <span className="auth-span">Join Woods & Wild community</span>
            
            {message.text && (
              <div className={`message ${message.type}`} style={{
                padding: '0.8rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                color: message.type === 'success' ? '#2ed573' : '#ff4757',
                backgroundColor: message.type === 'success' ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255, 71, 87, 0.1)',
                border: `1px solid ${message.type === 'success' ? 'rgba(46, 213, 115, 0.3)' : 'rgba(255, 71, 87, 0.3)'}`
              }}>
                {message.text}
              </div>
            )}
            
            <div className={`input-container ${errors.username ? 'error' : ''}`}>
              <FiUser />
              <input 
                type="text" 
                placeholder="Username" 
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required 
              />
            </div>
            {errors.username && <div style={{color: '#ff4757', fontSize: '0.8rem', marginTop: '-5px', marginBottom: '10px'}}>{errors.username}</div>}
            
            <div className={`input-container ${errors.email ? 'error' : ''}`}>
              <FiMail />
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required 
              />
            </div>
            {errors.email && <div style={{color: '#ff4757', fontSize: '0.8rem', marginTop: '-5px', marginBottom: '10px'}}>{errors.email}</div>}
            
            <div className={`input-container ${errors.password ? 'error' : ''}`}>
              <FiLock />
              <input 
                type="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required 
              />
            </div>
            {errors.password && <div style={{color: '#ff4757', fontSize: '0.8rem', marginTop: '-5px', marginBottom: '10px'}}>{errors.password}</div>}
            
            <button type="submit" className="auth-button" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Loading...</>
              ) : (
                <>
                  <FiUserPlus /> Sign Up
                </>
              )}
            </button>
            <p className="mobile-toggle">
              Already have an account? 
              <span onClick={handleSignInClick} className="auth-link" style={{cursor: 'pointer', marginLeft: '5px'}}>
                Sign In
              </span>
            </p>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleFormSubmit} className="auth-form">
            <h1 className="auth-title">Welcome Back</h1>
            <span className="auth-span">Sign in to your account</span>
            
            {message.text && (
              <div className={`message ${message.type}`} style={{
                padding: '0.8rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                color: message.type === 'success' ? '#2ed573' : '#ff4757',
                backgroundColor: message.type === 'success' ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255, 71, 87, 0.1)',
                border: `1px solid ${message.type === 'success' ? 'rgba(46, 213, 115, 0.3)' : 'rgba(255, 71, 87, 0.3)'}`
              }}>
                {message.text}
              </div>
            )}
            
            <div className={`input-container ${errors.username ? 'error' : ''}`}>
              <FiUser />
              <input 
                type="text" 
                placeholder="Username" 
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required 
              />
            </div>
            {errors.username && <div style={{color: '#ff4757', fontSize: '0.8rem', marginTop: '-5px', marginBottom: '10px'}}>{errors.username}</div>}
            
            <div className={`input-container ${errors.password ? 'error' : ''}`}>
              <FiLock />
              <input 
                type="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required 
              />
            </div>
            {errors.password && <div style={{color: '#ff4757', fontSize: '0.8rem', marginTop: '-5px', marginBottom: '10px'}}>{errors.password}</div>}
            
            <button 
              type="button" 
              className="auth-link" 
              style={{background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline'}}
              onClick={() => alert('Password reset feature coming soon!')}
            >
              Forgot your password?
            </button>
            
            <button type="submit" className="auth-button" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Loading...</>
              ) : (
                <>
                  <FiLogIn /> Sign In
                </>
              )}
            </button>
            <p className="mobile-toggle">
              Don't have an account? 
              <span onClick={handleSignUpClick} className="auth-link" style={{cursor: 'pointer', marginLeft: '5px'}}>
                Sign Up
              </span>
            </p>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="auth-title">Welcome Back!</h1>
              <p className="auth-paragraph">
                To keep connected with us please login with your personal info
              </p>
              <button className="auth-button ghost" onClick={handleSignInClick}>
                <FiLogIn /> Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="auth-title">Hello, Friend!</h1>
              <p className="auth-paragraph">Enter your personal details and start your journey with us</p>
              <button className="auth-button ghost" onClick={handleSignUpClick}>
                <FiUserPlus /> Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;