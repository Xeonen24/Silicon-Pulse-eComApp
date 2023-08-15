import React, { useState } from 'react';
import moment from "moment";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Rating,
  Select,
  MenuItem,
} from "@mui/material";

const ProductReviews = ({ product, reatingClickHandler }) => {
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'positive', 'negative'

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedReviews = [...product.ratingsAndReviews]; // Make a copy of the reviews array

  if (sortOrder === 'positive') {
    sortedReviews.sort((a, b) => b.rating - a.rating); // Sort by descending rating
  } else if (sortOrder === 'negative') {
    sortedReviews.sort((a, b) => a.rating - b.rating); // Sort by ascending rating
  }

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <Typography variant="h6" className="reviews-title">
          Reviews
        </Typography>
        <div className="sort-buttons">
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            variant="outlined"
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="positive">Positive Reviews First</MenuItem>
            <MenuItem value="negative">Negative Reviews First</MenuItem>
          </Select>
        </div>
        <Button
          className="add-rating-button"
          variant="contained"
          color="primary"
          onClick={reatingClickHandler}
        >
          Post a review
        </Button>
      </div>
      {sortedReviews.length > 0 ? (
        <>
          {sortedReviews.map((review, index) => (
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
