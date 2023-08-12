import React from 'react';
import moment from "moment";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Rating,
} from "@mui/material";

const ProductReviews = ({ product, reatingClickHandler, loggedInUser }) => {
  const isUserReview = (reviewUser) => {
    return loggedInUser && loggedInUser.username === reviewUser;
  };

  const handleEditClick = (reviewIndex) => {
    // Implement your edit review logic here, e.g. opening a modal or redirecting to an edit page
    console.log(`Edit review index: ${reviewIndex}`);
  };

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <Typography variant="h6" className="reviews-title">
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
          {product.ratingsAndReviews.map((review, index) => (
            <Card className="review-div" key={index}>
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
                action={
                  isUserReview(review.user) && (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </Button>
                  )
                }
              />
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
