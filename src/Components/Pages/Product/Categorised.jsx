import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function CategoryProducts() {
  const { categoryId } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const chckLogin = localStorage.getItem("loggedIn?");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + `/products/category/${categoryId}`)
      .then((response) => {
        setCategoryProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching category products:", error);
        setLoading(false);
      });
  }, [categoryId]);

  
  const handleCloseModal = () => {
    setShowLoginModal(false);
  };
  const handleCloseModal2 = () => {
    setShowLoginModal(false);
    window.location.href = "/login";
  };

  const addToCart = (productId) => {
    if (!chckLogin) {
      setShowLoginModal(true);
    } else {
      axios
        .post(
          process.env.REACT_APP_URL + "/cart/cart/add",
          {
            productId: productId,
            quantity: 1,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        )
        .then((response) => {
          toast.success("Item Added to cart", {
            autoClose: 2000,
            position: "bottom-right",
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
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
      <h2>Products in this Category</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {categoryProducts.map((product, index) => (
            <div className="grid-item" key={index}>
              <Link to={`/product/${product._id}`} className="product-link">
                <div style={{ padding: "1rem" }}>
                  <img
                    src={product.imagePath}
                    alt={product.title}
                    className="item-image"
                  />
                  <h3 className="item-title">{product.title}</h3>
                  {/* Add other components like Rating, prices, and stock information */}
                  {/* ... */}
                </div>
              </Link>
              <div style={{ paddingBottom: "1rem" }}>
                <button
                  className={
                    product.quantity > 0
                      ? "item-add-to-cart"
                      : "item-out-of-stock"
                  }
                  disabled={!product.quantity}
                  onClick={() => addToCart(product._id)}
                  style={{
                    backgroundColor: product.quantity ? "" : "#a6a6a6",
                  }}
                >
                  {/* Add cart icon or any other content */}
                  {/* ... */}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
