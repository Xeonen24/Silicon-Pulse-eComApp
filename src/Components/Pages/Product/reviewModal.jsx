import React, { useState } from 'react';
import './reviewmodal.css';

function ReviewModal({isModalOpen, setIsModalOpen}) {


  const [myuser, setMyuser] = useState(null);
  const [newRating, setNewRating] = useState(1); // Default rating
  const [newReview, setNewReview] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRatingChange = (event) => {
    setNewRating(parseInt(event.target.value));
  };

  const handleReviewChange = (event) => {
    setNewReview(event.target.value);
  };

  const handleAddRating = () => {
    setNewRating(1);
    setNewReview('');
    closeModal();
  };

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <h2 className="reviews-title">Reviews</h2>
        <button className="add-rating-button" onClick={openModal}>Add Rating</button>
      </div>
      {isModalOpen && (
        <div className="review-modal">
          <div className="review-modal-content">
            <h3>Add Rating</h3>
            <div className="rating-input">
              <label>Rating:</label>
              <select value={newRating} onChange={handleRatingChange}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div className="review-text-input">
              <label>Review:</label>
              <textarea value={newReview} onChange={handleReviewChange} />
            </div>
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleAddRating}>Add Rating</button>
              <button className="modal-button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewModal;