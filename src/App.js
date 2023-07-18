import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Footer from "./Components/Static/Footer/Footer";
import Profile from "./Components/Pages/Profile/Profile";
import Header from "./Components/Static/Header/Header";
import Product from "./Components/Pages/Product/Product";
import Signup from "./Components/Pages/Registration/Signup";
import ProductPage from "./Components/Pages/Product/ProductPage";
import Login from "./Components/Pages/Registration/Login";
import Cart from "./Components/Pages/Cart/Cart";
import ManageProduct from "./Components/Pages/AdminPanel/ManageProduct/manageProduct";
import ManageUser from "./Components/Pages/AdminPanel/manageUser";
import { ToastContainer } from 'react-toastify';
import AddProduct from "./Components/Pages/AdminPanel/ManageProduct/addProduct";
import EditProduct from "./Components/Pages/AdminPanel/ManageProduct/editProduct";

const App = () => {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-product" element={<ManageProduct />} />
        <Route path="/add-product/" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/manage-users" element={<ManageUser />} />
        <Route path="/product" element={<Product />} />
        <Route path='login' element={<Login />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
