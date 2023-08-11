import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./productpg.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import ReviewModal from "./reviewModal";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loginChek, setLoginChek] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [myuser, setMyuser] = useState(null);

  const checkLogin = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoginChek(true);
    } catch (error) {
      setLoginChek(false);
      console.error(error);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const fetchRating = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/get-rating/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setRating(response.data.ratingsAndReviews);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const postRating = async () => {
    setLoading(true);
    axios.post(
      `http://localhost:5000/api/post-rating/${id}`,
      {
        rating: myuser.rating,
        review: myuser.review,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  useEffect(() => {
    fetchProduct();
    fetchRating();
  }, [id]);

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };
  const handleCloseModal2 = () => {
    setShowLoginModal(false);
    window.location.href = "/login";
  };

  const addToCart = (productId) => {
    if (loginChek === false) {
      setShowLoginModal(true);
    } else {
      axios
        .post(
          "http://localhost:5000/api/cart/add",
          {
            productId: productId,
            quantity: 1,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);

          toast.success("Item Added to cart", {
            autoClose: 2000,
            position: "bottom-right",
          });
        })
        .catch((error) => console.log(error));
    }
  };

  const reatingClickHandler = () => {
    setReviewModal(true);
  };

  return (
    <>
      <Dialog
        open={showLoginModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"To add a product to the shopping cart, you must log in."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Proceed to login?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Not yet
          </Button>
          <Button
            onClick={() => {
              handleCloseModal2();
            }}
            color="primary"
            autoFocus
          >
            Yes, proceed
          </Button>
        </DialogActions>
      </Dialog>
      {loading ? (
        <div className="page-loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="productcontainer">
            <div className="product-details">
              <div className="product-image">
                <img src={product.imagePath} alt={product.title} />
              </div>
              <div className="product-info">
                <h2>{product.title}</h2>
                <p>Product ID: {product.productCode}</p>
                <h4>Manufacturer: {product.manufacturer}</h4>
                <h4>
                  Category:{" "}
                  <Link to={`/category/${product.category}`}>
                    {product.category}
                  </Link>
                </h4>
                <p>{product.description}</p>
                <h2 className="item-prices">
                  {product.discountprice !== 0
                    ? `₹ ${product.price}`
                    : `₹ ${product.price}`}
                </h2>
                <h2 className="item-dcprices">
                  {product.discountprice !== 0
                    ? `₹ ${product.discountprice}`
                    : ""}
                </h2>
                <h4>{product.quantity > 0 ? "In Stock" : "Out of Stock"}</h4>
                {product.quantity > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => addToCart(product._id)}
                    >
                      Add to Cart
                    </button>

                    <div>{}</div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="product-reviews">
            <div className="reviews-header">
              <h2 className="reviews-title">Reviews</h2>
              <button
                className="add-rating-button"
                onClick={reatingClickHandler}
              >
                Add Rating
              </button>
            </div>
            {rating && rating.length > 0 ? (
              rating.map((review, index) => (
                <div className="review-div" key={index}>
                  <div className="review-card-header">
                    <h4 className="review-user">{review.user}</h4>
                    <p className="review-rating">Rating: {review.rating}</p>
                    <p className="review-date">
                      Date:{" "}
                      {moment(review.createdAt).utc().format("YYYY-MM-DD")}
                    </p>
                  </div>
                  <div className="review-card-body">
                    <p className="review-text">{review.review}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-ratings">No ratings found</div>
            )}
          </div>

          {reviewModal && (
            <ReviewModal
              isModalOpen={reviewModal}
              setIsModalOpen={setReviewModal}
            />
          )}
        </>
      )}
    </>
  );
};

export default ProductPage;
