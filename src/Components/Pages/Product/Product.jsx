import React, { useState, useEffect } from "react";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Shimmer } from "react-shimmer";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);
  const location = useLocation();
  const [loginChek, setLoginChek] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const response = await axios.get(process.URL + "/auth/user", {
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
    axios
      .all([
        axios.get(process.URL + "/products/categories"),
        axios.get(process.URL + "/products/products"),
      ])
      .then(
        axios.spread((categoriesResponse, productsResponse) => {
          setCategories(categoriesResponse.data);
          setProducts(productsResponse.data);
          setLoading(false);
        })
      )
      .catch((error) => {
        console.error("Error fetching categories and products:", error);
        setLoading(false);
      });
    setTimeout(() => {
      setProductLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    setSelectedCategory(category || "");
  }, [location.search]);

  const handleCategoryChange = (categoryId) => {
    setLoading(true);

    setTimeout(() => {
      setSelectedCategory(categoryId);
      setCurrentPage(1);
      setLoading(false);
    }, 150);
  };

  const getSelectedCategoryTitle = (categoryId) => {
    const selectedCategoryObject = categories.find(
      (category) => category._id === categoryId
    );
    return selectedCategoryObject ? selectedCategoryObject.title : "";
  };

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
          process.URL + "/cart/cart/add",
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const sortProducts = (products) => {
    return products.slice().sort((a, b) => {
      const priceA = a.discountprice !== 0 ? a.discountprice : a.price;
      const priceB = b.discountprice !== 0 ? b.discountprice : b.price;

      if (sortOrder === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  };

  const paginate = (pageNumber) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setLoading(false);
    }, 200);
  };

  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const sortedProducts = sortProducts(filteredProducts);
  const currentProducts = sortedProducts.slice(startIdx, endIdx);

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
          <div class="category-dropdown">
            <div class="selected-category">
              {selectedCategory === ""
                ? "All Categories"
                : getSelectedCategoryTitle(selectedCategory)}
            </div>
            <div class="category-options">
              <div
                class={`category-option ${
                  selectedCategory === "" ? "active" : ""
                }`}
                onClick={() => {
                  if (selectedCategory !== "") {
                    handleCategoryChange("");
                  }
                }}
              >
                All Categories
              </div>
              <div>
                {categories.map((category) => (
                  <div
                    key={category._id}
                    class={`category-option ${
                      selectedCategory === category._id ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange(category._id)}
                  >
                    {category.title}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sort-buttons">
            <button
              className={`ascdscbut ${sortOrder === "asc" ? "active" : ""}`}
              onClick={() => setSortOrder("asc")}
              disabled={sortOrder === "asc"}
            >
              Price Low to High
            </button>
            <button
              className={`ascdscbut ${sortOrder === "desc" ? "active" : ""}`}
              onClick={() => setSortOrder("desc")}
              disabled={sortOrder === "desc"}
            >
              Price High to Low
            </button>
          </div>

          {productLoading ? (
            <div className="grid">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  className="grid-item"
                  style={{ paddingBottom: "12.7rem" }}
                  key={index}
                >
                  <div style={{ padding: "1rem" }}>
                    <Shimmer
                      width={300}
                      height={300}
                      style={{ borderRadius: "15px" }}
                    />
                    <br />
                    <Shimmer
                      width={300}
                      height={20}
                      style={{ marginTop: "0.5rem", borderRadius: "5px" }}
                    />
                    <br />
                    <Shimmer
                      width={100}
                      height={15}
                      style={{ marginTop: "5rem", borderRadius: "5px" }}
                    />
                    <br />
                    <Shimmer
                      width={100}
                      height={15}
                      style={{ marginTop: "0.25rem", borderRadius: "5px" }}
                    />
                    <br />
                    <Shimmer
                      width={200}
                      height={15}
                      style={{ marginTop: "0.25rem", borderRadius: "5px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid">
              {currentProducts.map((product, index) => (
                <div className="grid-item" key={index}>
                  <Link to={`/product/${product._id}`} className="product-link">
                    <div style={{ padding: "1rem" }}>
                      <img
                        src={product.imagePath}
                        alt={product.title}
                        className="item-image"
                      />
                      <h3 className="item-title">{product.title}</h3>
                      <Rating
                        name={`average-rating-${product._id}`}
                        value={product.averageRating}
                        readOnly
                      />
                      <p className="item-prices">
                        {product.discountprice !== 0
                          ? `₹ ${product.price}`
                          : `₹ ${product.price}`}
                      </p>
                      <p className="item-dcprices">
                        {product.discountprice !== 0
                          ? `₹ ${product.discountprice}`
                          : ""}
                      </p>
                      <h4
                        style={{
                          color: product.quantity > 0 ? "green" : "red",
                        }}
                      >
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </h4>
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
                      <FontAwesomeIcon
                        icon={faCartPlus}
                        style={{ fontSize: "23px", paddingLeft: "0rem" }}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pagination">
            {Array.from(
              Array(Math.ceil(sortedProducts.length / productsPerPage)),
              (item, index) => (
                <Button
                  color="primary"
                  variant="outlined"
                  key={index}
                  sx={{ fontWeight: "bold", marginRight: "1rem" }}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Button>
              )
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Product;
