import React, { useState, useEffect } from "react";
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

function ReviewModal({ isModalOpen, setIsModalOpen, productId, mode , editData }) {
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(1);
  const [newReview, setNewReview] = useState("");


  useEffect(() => {
    if(mode === "edit"){
      setNewRating(editData.rating)
      setNewReview(editData.review)
    }
  }, [editData])


  const postRating = async () => {
    setLoading(true);
    try {
      await axios.post(
        process.URL + `/products/post-rating/${productId}`,
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

  const handleEditReview = async () => {
    setLoading(true);
    try {
      await axios.put(
        process.URL + `products/update-rating/${productId}`,
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
        toast.error("You have not reviewd this product", {
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

  return (
    <>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          className="review-dialog-content"
          style={{ width: "500px", height: "550px", padding: "2rem" }}
        >
          <Typography variant="h4">
            {mode === "edit" ? "Edit Review" : "Add Rating"}
          </Typography>
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
            style={{width: "100%", height: "270px",marginTop: "1rem"}}
            value={newReview}
            onChange={handleReviewChange}
            multiline
            rows={10}
          />
          <div className="dialog-buttons">
            {mode === "edit" ? (
              <button className="ascdscbut" style={{width:"10rem"}} onClick={handleEditReview}>
                Edit Review
              </button>
            ) : (
              <button className="ascdscbut" style={{width:"8rem",fontSize:'1rem'}}  onClick={handleAddRating}>
                Add Rating
              </button>
            )}
            <button
              className="ascdscbut"
              style={{width: "8rem",fontSize:'1rem'}}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ReviewModal;
