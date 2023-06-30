import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Footer from "./Components/Static/Footer/Footer";
import Header from "./Components/Static/Header/Header";
import Product from "./Components/Pages/Product/Product";
import Signup from "./Components/Pages/Registration/Signup";
import ProductPage from "./Components/Pages/Product/ProductPage";
import Login from "./Components/Pages/Registration/Login";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path='login' element={<Login />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
