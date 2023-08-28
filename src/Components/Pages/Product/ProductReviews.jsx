import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Rating,
} from "@mui/material";

const ProductReviews = ({ product , setReviewModal , setMode , setEditData }) => {
  const [user, setUser] = useState(null);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(process.URL + "/auth/user", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        setUser(res.data);

        if(res.data && product.ratingsAndReviews) {
          const userReview = product.ratingsAndReviews.find(
            (review) => review.user === res.data.username
          );
          product.ratingsAndReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
          setUserReview(userReview);
          setEditData(userReview);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const reatingClickHandler = () => {
    setMode("rating")
    setReviewModal(true);
  };

  const handleEditClick = (reviewIndex) => {
    setMode("edit")
    setReviewModal(true);
  };

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <Typography variant="h7" className="reviews-title">
          Reviews
        </Typography>
        <button
          className="ascdscbut"
          onClick={reatingClickHandler}
        >
          Post a review
        </button>
      </div>
      {product.ratingsAndReviews && product.ratingsAndReviews.length > 0 ? (
        <>
      {product.ratingsAndReviews.filter(review => review.user === user?.username).map((review, index) => (
            <Card className="review-div" key={index}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <CardHeader
                  className="review-card-header"
                  title={
                    <Typography variant="h6" className="review-user">
                      {review.user}
                    </Typography>
                  }
                  subheader={
                    <>
                      <Rating
                        name={`rating-${index}`}
                        value={review.rating}
                        readOnly
                        precision={0.5}
                        className="review-rating"
                      />
                      <Typography variant="body2" className="review-date">
                        {moment(review.date).format("DD MMM YYYY, h:mm A")}
                      </Typography>
                    </>
                  }
                />

                {review.user === user?.username && 
                <div style={{marginRight:'1rem'}}>
                  <button
                  style={{width:'100%'}}
                  className="ascdscbut"
                  onClick={handleEditClick}
                  >
                  Edit
                  </button>
                </div>
              }

              </div>
              <CardContent className="review-card-body">
                <Typography variant="body1" className="review-text">
                  {review.review}
                </Typography>
              </CardContent>
            </Card>
          ))}

    {product.ratingsAndReviews.filter(review => review.user !== user?.username).map((review, index) => (
            <Card className="review-div" key={index}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <CardHeader
                  className="review-card-header"
                  title={
                    <Typography variant="h6" className="review-user">
                      {review.user}
                    </Typography>
                  }
                  subheader={
                    <>
                      <Rating
                        name={`rating-${index}`}
                        value={review.rating}
                        readOnly
                        precision={0.5}
                        className="review-rating"
                      />
                      <Typography variant="body2" className="review-date">
                        {moment(review.date).format("DD MMM YYYY, h:mm A")}
                      </Typography>
                    </>
                  }
                />

              </div>
              <CardContent className="review-card-body">
                <Typography variant="body1" className="review-text">
                  {review.review}
                </Typography>
              </CardContent>
            </Card>
          ))}



        </>

      ) : (
        <div className="no-ratings">No ratings found</div>
      )}
    </div>
  );
};

export default ProductReviews;