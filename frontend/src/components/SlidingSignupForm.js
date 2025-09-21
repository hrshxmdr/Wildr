import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import './SlidingSignupForm.css';

const SlidingSignupForm = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const [signinForm, setSigninForm] = useState({ 
    username: '', 
    password: '' 
  });
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(signupForm.username, signupForm.email, signupForm.password);
    } catch (err) {
      console.error('Signup error:', err);
      setError('Signup failed. Please try again.');
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(signinForm.username, signinForm.password);
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="slidingFormContainer" onClick={() => navigate('/')}>
      <button 
        className="close-button" 
        onClick={() => navigate('/')}
        aria-label="Close form"
      >
        <i className="fas fa-times"></i>
      </button>
      <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleSignin}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={signinForm.username}
                  onChange={(e) => setSigninForm({...signinForm, username: e.target.value})}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={signinForm.password}
                  onChange={(e) => setSigninForm({...signinForm, password: e.target.value})}
                  required
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <button type="button" className="social-icon" aria-label="Sign in with Facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" className="social-icon" aria-label="Sign in with Twitter">
                  <i className="fab fa-twitter"></i>
                </button>
                <button type="button" className="social-icon" aria-label="Sign in with Google">
                  <i className="fab fa-google"></i>
                </button>
                <button type="button" className="social-icon" aria-label="Sign in with LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div>
            </form>

            <form className="sign-up-form" onSubmit={handleSignup}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={signupForm.username}
                  onChange={(e) => setSignupForm({...signupForm, username: e.target.value})}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  required
                />
              </div>
              <input type="submit" className="btn" value="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <button type="button" className="social-icon" aria-label="Sign up with Facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" className="social-icon" aria-label="Sign up with Twitter">
                  <i className="fab fa-twitter"></i>
                </button>
                <button type="button" className="social-icon" aria-label="Sign up with Google">
                  <i className="fab fa-google"></i>
                </button>
                <button type="button" className="social-icon" aria-label="Sign up with LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Join our community of outdoor enthusiasts and discover amazing camping spots!
              </p>
              <button className="btn transparent" onClick={toggleMode}>
                Sign up
              </button>
            </div>
            <img src="/img/log.svg" className="image" alt="Sign in illustration" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Welcome back! Sign in to continue your camping adventures.
              </p>
              <button className="btn transparent" onClick={toggleMode}>
                Sign in
              </button>
            </div>
            <img src="/img/register.svg" className="image" alt="Sign up illustration" />
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default SlidingSignupForm;