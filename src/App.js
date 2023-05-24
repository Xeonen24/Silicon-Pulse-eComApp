import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Footer from "./Components/Static/Footer/Footer";
import Header from "./Components/Static/Header/Header";
import Product from "./Components/Pages/Product/Product";
import Signup from "./Components/Pages/Registration/Signup";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
