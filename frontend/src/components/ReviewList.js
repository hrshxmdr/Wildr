import React, { useState, useEffect } from 'react';
import { FiStar, FiEdit2, FiTrash2, FiUser, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../AuthContext';
import ReviewForm from './ReviewForm';
import api from '../api';
import './ReviewList.css';

const ReviewList = ({ campsiteId, onReviewsUpdate }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    if (campsiteId) {
      console.log('ReviewList: Fetching reviews for campsite ID:', campsiteId);
      fetchReviews();
    }
  }, [campsiteId]);

  const fetchReviews = async () => {
    if (!campsiteId) {
      console.log('ReviewList: No campsite ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('ReviewList: Making API call to fetch reviews for:', campsiteId);
      const response = await api.get(`/reviews?campsiteId=${campsiteId}`);
      console.log('ReviewList: Received reviews:', response.data);
      setReviews(response.data);
      
      // Find user's existing review
      if (user) {
        const existingUserReview = response.data.find(
          review => review.user._id === user.id || review.user._id === user._id
        );
        setUserReview(existingUserReview);
        console.log('ReviewList: User existing review:', existingUserReview);
      }
      
      setError('');
    } catch (error) {
      console.error('ReviewList: Error fetching reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = (newReview) => {
    if (editingReview) {
      // Update existing review
      setReviews(reviews.map(review => 
        review._id === editingReview._id ? newReview : review
      ));
      setUserReview(newReview);
      setEditingReview(null);
    } else {
      // Add new review
      setReviews([newReview, ...reviews]);
      setUserReview(newReview);
    }
    
    setShowReviewForm(false);
    
    // Notify parent component about review update
    if (onReviewsUpdate) {
      onReviewsUpdate();
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter(review => review._id !== reviewId));
      setUserReview(null);
      
      if (onReviewsUpdate) {
        onReviewsUpdate();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    }
  };

  const handleCancelForm = () => {
    setShowReviewForm(false);
    setEditingReview(null);
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
      <div className="reviews-section">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h3>Reviews ({reviews.length})</h3>
        
        {user && !userReview && !showReviewForm && (
          <button 
            onClick={() => setShowReviewForm(true)}
            className="write-review-btn"
          >
            Write a Review
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          campsiteId={campsiteId}
          existingReview={editingReview}
          onReviewSubmitted={handleReviewSubmitted}
          onCancel={handleCancelForm}
        />
      )}

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <FiStar className="no-reviews-icon" />
            <h4>No reviews yet</h4>
            <p>Be the first to share your experience at this campsite!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    <FiUser />
                  </div>
                  <div className="reviewer-details">
                    <h4 className="reviewer-name">
                      {review.user?.username || 'Anonymous'}
                    </h4>
                    <div className="review-meta">
                      {renderStars(review.rating)}
                      <span className="review-date">
                        <FiCalendar />
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Review Actions (for review owner) */}
                {user && (user.id === review.user?._id || user._id === review.user?._id) && (
                  <div className="review-actions">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="action-btn edit-btn"
                      title="Edit review"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="action-btn delete-btn"
                      title="Delete review"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="review-content">
                <p className="review-comment">{review.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewList;
