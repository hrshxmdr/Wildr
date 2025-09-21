import React, { useState } from 'react';
import { FiStar, FiSend, FiX } from 'react-icons/fi';
import api from '../api';
import './ReviewForm.css';

const ReviewForm = ({ campsiteId, onReviewSubmitted, onCancel, existingReview = null }) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Calculate word count
  const wordCount = comment.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isWordLimitExceeded = wordCount > 50;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a star rating');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please write a review comment');
      return;
    }
    
    if (isWordLimitExceeded) {
      setError('Review cannot exceed 50 words');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      let response;
      if (existingReview) {
        // Update existing review
        response = await api.put(`/reviews/${existingReview._id}`, {
          rating,
          comment: comment.trim()
        });
      } else {
        // Create new review
        response = await api.post('/reviews', {
          campsiteId,
          rating,
          comment: comment.trim()
        });
      }
      
      onReviewSubmitted(response.data);
      
      // Reset form if creating new review
      if (!existingReview) {
        setRating(0);
        setComment('');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError(error.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (starRating) => {
    setRating(starRating);
    setError('');
  };

  const handleStarHover = (starRating) => {
    setHoverRating(starRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setError('');
  };

  return (
    <div className="review-form-container">
      <div className="review-form-header">
        <h3>{existingReview ? 'Edit Your Review' : 'Write a Review'}</h3>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="close-btn"
            aria-label="Close"
          >
            <FiX />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="review-form">
        {/* Star Rating */}
        <div className="rating-section">
          <label className="rating-label">Your Rating *</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star ${(hoverRating || rating) >= star ? 'active' : ''}`}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <FiStar />
              </button>
            ))}
            <span className="rating-text">
              {rating > 0 && (
                <span className="rating-value">
                  {rating} star{rating > 1 ? 's' : ''}
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Comment Section */}
        <div className="comment-section">
          <label htmlFor="comment" className="comment-label">
            Your Review * 
            <span className="word-count">
              ({wordCount}/50 words)
            </span>
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Share your experience at this campsite... (max 50 words)"
            className={`comment-textarea ${isWordLimitExceeded ? 'error' : ''}`}
            rows="4"
            maxLength="300"
            required
          />
          {isWordLimitExceeded && (
            <div className="word-limit-warning">
              Review cannot exceed 50 words. Please shorten your review.
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || rating === 0 || !comment.trim() || isWordLimitExceeded}
          >
            {isSubmitting ? (
              <>Submitting...</>
            ) : (
              <>
                <FiSend /> {existingReview ? 'Update Review' : 'Submit Review'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
