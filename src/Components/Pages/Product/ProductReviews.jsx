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

const ProductReviews = ({ product, reatingClickHandler }) => {
  const [user, setUser] = useState(null);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/user", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        setUser(res.data);

        if (res.data && product.ratingsAndReviews) {
          const userReview = product.ratingsAndReviews.find(
            (review) => review.user === res.data.username
          );
          setUserReview(userReview);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(userReview);

  const handleEditClick = (reviewIndex) => {
    console.log(`Edit review index: ${reviewIndex}`);
  };

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <Typography variant="h7" className="reviews-title">
          Reviews
        </Typography>
        <Button
          className="add-rating-button"
          variant="contained"
          color="primary"
          onClick={reatingClickHandler}
        >
          Post a review
        </Button>
      </div>
      {product.ratingsAndReviews && product.ratingsAndReviews.length > 0 ? (
        <>
          {userReview && (
            <Card className="review-div">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <CardHeader
                  className="review-card-header"
                  title={
                    <Typography variant="h6" className="review-user">
                      {userReview.user}
                    </Typography>
                  }
                  subheader={
                    <>
                      <Rating
                        name={`rating-user`}
                        value={userReview.rating}
                        readOnly
                        precision={0.5}
                        className="review-rating"
                      />
                      <Typography variant="body2" className="review-date">
                        {moment(userReview.date).format("DD MMM YYYY, h:mm A")}
                      </Typography>
                    </>
                  }
                />
                <div className="review-edit">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <CardContent className="review-card-body">
                <Typography variant="body1" className="review-text">
                  {userReview.review}
                </Typography>
              </CardContent>
            </Card>
          )}
         
         {product.ratingsAndReviews
          .filter((rev) =>  !userReview || rev.user !== userReview.user )
          .map((review, index) => (
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
