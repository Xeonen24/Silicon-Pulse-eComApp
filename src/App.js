import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Profile from "./Components/Pages/Profile/Profile";
import Header from "./Components/Static/Header/Header";
import Product from "./Components/Pages/Product/Product";
import Signup from "./Components/Pages/Registration/Signup";
import ProductPage from "./Components/Pages/Product/ProductPage";
import LoginForm from "./Components/Pages/Registration/LoginForm";
import Cart from "./Components/Pages/Cart/Cart";
import ManageProduct from "./Components/Pages/AdminPanel/ManageProduct/manageProduct";
import ManageUser from "./Components/Pages/AdminPanel/ManageUser/manageUser";
import { ToastContainer } from 'react-toastify';
import AddProduct from "./Components/Pages/AdminPanel/ManageProduct/addProduct";
import EditProduct from "./Components/Pages/AdminPanel/ManageProduct/editProduct";
import Order from "./Components/Pages/Order/Order";
import ThankYouPage from "./Components/Pages/Order/Ty";
import About from "./Components/Pages/About/About";

const App = () => {
  return (
    <div className="wrapper">
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
        <Route path='login' element={<LoginForm />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/order" element={<Order />} />
        <Route path="/ty" element={<ThankYouPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
