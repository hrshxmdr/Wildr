import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Button, Modal, Alert } from 'react-bootstrap';
import { FiStar, FiEdit2, FiTrash2, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useAuth } from '../AuthContext';
import ReviewForm from '../components/ReviewForm';
import api from '../api';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [b, r] = await Promise.all([
          api.get('/bookings/me'),
          api.get('/reviews/me')
        ]);
        if (!mounted) return;
        setBookings(Array.isArray(b.data) ? b.data : []);
        setReviews(Array.isArray(r.data) ? r.data : []);
      } catch (e) {
        // ignore, likely not logged in
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowEditModal(true);
    setMessage({ type: '', text: '' });
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter(review => review._id !== reviewId));
      setMessage({ type: 'success', text: 'Review deleted successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error deleting review:', error);
      setMessage({ type: 'error', text: 'Failed to delete review. Please try again.' });
    }
  };

  const handleReviewUpdated = (updatedReview) => {
    setReviews(reviews.map(review => 
      review._id === updatedReview._id ? updatedReview : review
    ));
    setShowEditModal(false);
    setEditingReview(null);
    setMessage({ type: 'success', text: 'Review updated successfully!' });
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
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
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <div className="main-content">
      <Container className="py-4">
      <Row>
        <Col>
          <div className="profile-header">
            <h2 className="profile-title">My Profile</h2>
            <p className="profile-subtitle">Welcome back, {user?.username}!</p>
          </div>
        </Col>
      </Row>

      {message.text && (
        <Row className="mb-3">
          <Col>
            <Alert variant={message.type === 'success' ? 'success' : 'danger'} className="profile-alert">
              {message.text}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="gy-4">
        <Col lg={6}>
          <Card className="profile-card">
            <Card.Body>
              <Card.Title className="profile-card-title">
                <FiMapPin /> My Bookings ({bookings.length})
              </Card.Title>
              {bookings.length === 0 ? (
                <div className="empty-state">
                  <FiMapPin className="empty-icon" />
                  <p>No bookings yet.</p>
                  <small className="text-muted">Your camping adventures will appear here!</small>
                </div>
              ) : (
                <div className="bookings-list">
                  {bookings.map((b) => (
                    <div key={b._id} className="booking-item">
                      <div className="booking-header">
                        <h5 className="booking-name">{b.campsite?.name || 'Campsite'}</h5>
                        <span className="booking-status">Confirmed</span>
                      </div>
                      <div className="booking-location">
                        <FiMapPin /> {b.campsite?.location}
                      </div>
                      <div className="booking-dates">
                        <FiCalendar /> {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}
                      </div>
                      <div className="booking-guests">
                        Guests: {b.guests}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className="profile-card">
            <Card.Body>
              <Card.Title className="profile-card-title">
                <FiStar /> My Reviews ({reviews.length})
              </Card.Title>
              {reviews.length === 0 ? (
                <div className="empty-state">
                  <FiStar className="empty-icon" />
                  <p>No reviews yet.</p>
                  <small className="text-muted">Share your camping experiences with the community!</small>
                </div>
              ) : (
                <div className="reviews-list">
                  {reviews.map((r) => (
                    <div key={r._id} className="review-item">
                      <div className="review-header">
                        <div className="review-campsite-info">
                          <h5 className="review-campsite-name">{r.campsite?.name || 'Campsite'}</h5>
                          <div className="review-location">
                            <FiMapPin /> {r.campsite?.location}
                          </div>
                        </div>
                        <div className="review-actions">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEditReview(r)}
                            className="me-2"
                          >
                            <FiEdit2 />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteReview(r._id)}
                          >
                            <FiTrash2 />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="review-rating-date">
                        {renderStars(r.rating)}
                        <span className="review-date">
                          <FiCalendar /> {formatDate(r.createdAt)}
                        </span>
                      </div>
                      
                      {r.comment && (
                        <div className="review-comment">
                          "{r.comment}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Review Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingReview && (
            <ReviewForm
              campsiteId={editingReview.campsite._id}
              existingReview={editingReview}
              onReviewSubmitted={handleReviewUpdated}
              onCancel={() => setShowEditModal(false)}
            />
          )}
        </Modal.Body>
      </Modal>
      </Container>
    </div>
  );
};

export default ProfilePage;
