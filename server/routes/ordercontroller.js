const express = require('express');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const auth = require('../midddleware/auth');
const USER = require('../model/user');
const Address = require("../model/userAddress");
const Order = require("../model/orders");
const router = express.Router();

router.post("/saveaddress", auth, asyncHandler(async (req, res) => {
    const user = await USER.findById(req.userID);
    
    try {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const addressData = {
        name: req.body.name,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
      };
  
      const address = new Address(addressData);
      await address.save();
  
      user.addresses.push(address);
      await user.save();
  
      res.status(201).json(address);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }));
  

  router.post("/makeorder", auth, asyncHandler(async (req, res) => {
    const user = await USER.findById(req.userID);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

    try {
      const {totalPrice, paymentMethod, products, transactionId, addressId } = req.body;
  
      const orderData = {
        user: user,
        totalPrice: totalPrice,
        paymentMethod: paymentMethod,
        products: products,
        transactionId: transactionId,
        address: addressId,
      };
  
      const order = new Order(orderData);
      await order.save();
  
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }));

  router.get("/getorders", auth, asyncHandler(async (req, res) => {
    try{
      console.log(req.userID)

      const orders = await Order.find({ user: req.userID }).populate({
        path: 'products.product',
      });


      res.status(200).json(orders);
    }
    catch(error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }));
  

module.exports = router