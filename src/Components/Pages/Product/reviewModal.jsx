import React, { useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./reviewmodal.css";

function ReviewModal({ isModalOpen, setIsModalOpen, productId }) {
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(1);
  const [newReview, setNewReview] = useState("");

  const postRating = async () => {
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/post-rating/${productId}`,
        {
          rating: newRating,
          review: newReview,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("You cannot post more than one", {
          autoClose: 2000,
          position: "top-right",
        });
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (event, value) => {
    setNewRating(value);
  };

  const handleReviewChange = (event) => {
    setNewReview(event.target.value);
  };

  const handleAddRating = () => {
    postRating();
    setNewRating(1);
    setNewReview("");
    setIsModalOpen(false);
  };

  return (
    <>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          className="review-dialog-content"
          style={{ width: "500px", height: "500px", padding: "2rem" }}
        >
          <Typography variant="h4">Add Rating</Typography>
          <FormControl>
            <Rating
              style={{ fontSize: "2rem" }}
              precision={0.5}
              name="new-rating"
              value={newRating}
              onChange={handleRatingChange}
            />
          </FormControl>
          <InputLabel>Review:</InputLabel>
          <TextField
            value={newReview}
            onChange={handleReviewChange}
            multiline
            rows={4}
          />
          <div className="dialog-buttons">
            <Button className="dialog-button" onClick={handleAddRating}>
              Add Rating
            </Button>
            <Button
              className="dialog-button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ReviewModal;
