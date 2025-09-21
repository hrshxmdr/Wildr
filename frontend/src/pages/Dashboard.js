import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, 
  FiMapPin, 
  FiBookmark, 
  FiUser, 
  FiHome,
  FiTrendingUp,
  FiStar,
  FiLogOut,
  FiCalendar
} from 'react-icons/fi';
import api from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    campsites: 0,
    bookings: 0,
    reviews: 0
  });
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      
      // Fetch user's reviews
      const reviewsResponse = await api.get('/reviews/me');
      const userReviews = reviewsResponse.data;
      
      // Fetch user's campsites
      const campsitesResponse = await api.get('/campsites/my');
      const userCampsites = campsitesResponse.data;
      
      // Update stats
      setStats({
        campsites: userCampsites.length,
        bookings: 0, // TODO: Implement bookings count
        reviews: userReviews.length
      });
      
      // Set recent reviews (last 3)
      setRecentReviews(userReviews.slice(0, 3));
      
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const renderStars = (rating) => {
    return (
      <div className="star-display">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard-page main-content">
      <div className="dashboard-container container py-4">
        
        {/* Header Section */}
        <div className="dashboard-header">
          <h1>
            <FiHome className="welcome-icon" />
            Welcome to Wildr!
          </h1>
          <p>Hello <strong>{user.username}</strong>! Ready for your next outdoor adventure?</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon">
                <FiMapPin />
              </div>
            </div>
            <div className="stat-number">{loading ? '...' : stats.campsites}</div>
            <div className="stat-label">Campsites Added</div>
          </div>

          <div className="stat-card secondary">
            <div className="stat-header">
              <div className="stat-icon">
                <FiBookmark />
              </div>
            </div>
            <div className="stat-number">{loading ? '...' : stats.bookings}</div>
            <div className="stat-label">Bookings Made</div>
          </div>

          <div className="stat-card accent">
            <div className="stat-header">
              <div className="stat-icon">
                <FiStar />
              </div>
            </div>
            <div className="stat-number">{loading ? '...' : stats.reviews}</div>
            <div className="stat-label">Reviews Given</div>
          </div>
        </div>

        {/* Account Info */}
        <div className="account-info">
          <h3>
            <FiUser /> Your Account Information
          </h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Username</div>
              <div className="info-value">{user.username}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Email Address</div>
              <div className="info-value">{user.email}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Member Since</div>
              <div className="info-value">Recently Joined</div>
            </div>
            <div className="info-item">
              <div className="info-label">Account Status</div>
              <div className="info-value">Active</div>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        {recentReviews.length > 0 && (
          <div className="recent-reviews">
            <h2 className="section-title">
              <FiStar /> Your Recent Reviews
            </h2>
            <div className="reviews-grid">
              {recentReviews.map((review) => (
                <div key={review._id} className="review-card-mini">
                  <div className="review-header-mini">
                    <h4 className="campsite-name">{review.campsite?.name}</h4>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="review-comment-mini">{review.comment}</p>
                  <div className="review-date-mini">
                    <FiCalendar />
                    {formatDate(review.createdAt)}
                  </div>
                </div>
              ))}
            </div>
            {stats.reviews > 3 && (
              <div className="view-all-reviews">
                <button 
                  onClick={() => navigate('/profile')}
                  className="view-all-btn"
                >
                  View All Reviews ({stats.reviews})
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2 className="section-title">
            <FiTrendingUp /> Quick Actions
          </h2>
          <div className="actions-grid">
            <div 
              className="action-card primary"
              onClick={() => navigate('/add-campsite')}
            >
              <div className="action-header">
                <div className="action-icon">
                  <FiPlus />
                </div>
                <div className="action-content">
                  <h4>Add New Campsite</h4>
                  <p>Share your favorite camping spot with the community and help fellow adventurers discover amazing places.</p>
                </div>
              </div>
            </div>

            <div 
              className="action-card secondary"
              onClick={() => navigate('/campsites')}
            >
              <div className="action-header">
                <div className="action-icon">
                  <FiMapPin />
                </div>
                <div className="action-content">
                  <h4>Browse Campsites</h4>
                  <p>Explore thousands of campsites, read reviews, and find the perfect spot for your next outdoor adventure.</p>
                </div>
              </div>
            </div>

            <div 
              className="action-card neutral"
              onClick={() => navigate('/bookings')}
            >
              <div className="action-header">
                <div className="action-icon">
                  <FiBookmark />
                </div>
                <div className="action-content">
                  <h4>My Bookings</h4>
                  <p>View and manage your campsite reservations, check booking details, and plan your upcoming trips.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="logout-section">
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut /> Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
