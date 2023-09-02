
const express = require('express');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const auth = require('../midddleware/auth');
const USER = require('../model/user');
const Product = require('../model/product');

const router = express.Router();

router.post('/cart/add', auth, asyncHandler(async (req, res) => {
    try {
  
      const { productId, quantity } = req.body;
      const user = await USER.findById(req.userID);
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const myid = new mongoose.Types.ObjectId(productId);
      const existingCartItem = user.cart.find((item) => item.product.equals(myid));
  
      if (existingCartItem) {
        await USER.findByIdAndUpdate(req.userID, {
          $inc: { "cart.$[elem].quantity": quantity }
        }, { arrayFilters: [{ "elem.product": existingCartItem.product }] });
      } else {
        user.cart.push({ product: productId, quantity });
        await user.save();
      }
  
      const updatedUser = await USER.findById(req.userID);
  
      res.json({ message: 'Product added to cart', updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));
  
  router.post('/cart/inc', auth, asyncHandler(async (req, res) => {
    try {
  
      const { productId, quantity } = req.body;
  
      const user = await USER.findById(req.userID);
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const myid = new mongoose.Types.ObjectId(productId);
  
      const existingCartItem = user.cart.find((item) => item.product.equals(myid));
  
      console.log("yolo", existingCartItem);
  
      if (existingCartItem) {
        await USER.findByIdAndUpdate(req.userID, {
          $inc: { "cart.$[elem].quantity": quantity }
        }, { arrayFilters: [{ "elem.product": existingCartItem.product }] });
      } else {
        user.cart.push({ product: productId, quantity });
        await user.save();
      }
  
      const updatedUser = await USER.findById(req.userID);
  
      res.json({ message: 'Product added to cart', updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));
  
  router.post('/cart/dec', auth, asyncHandler(async (req, res) => {
    try {
      const { productId, quantity } = req.body;
  
      const user = await USER.findById(req.userID);
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const myid = new mongoose.Types.ObjectId(productId);
  
  
      const existingCartItem = user.cart.find((item) => item.product.equals(myid));
  
      console.log("yolo", existingCartItem);
  
      if (existingCartItem) {
        const newQuantity = existingCartItem.quantity - 1;
        if (newQuantity <= 0) {
          // Remove the item from the cart if the new quantity is zero or negative
          await USER.findByIdAndUpdate(req.userID, {
            $pull: { cart: { product: existingCartItem.product } }
          });
        } else {
          // Update the quantity of the existing item
          await USER.findByIdAndUpdate(req.userID, {
            $set: { "cart.$[elem].quantity": newQuantity }
          }, { arrayFilters: [{ "elem.product": existingCartItem.product }] });
        }
      } else {
        // Add the item to the cart
        user.cart.push({ product: productId, quantity: 1 });
        await user.save();
      }
  
      const updatedUser = await USER.findById(req.userID);
  
      res.json({ message: 'Product added to cart', updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));
  
  
  router.get('/cart', auth, asyncHandler(async (req, res) => {
    console.log('Request received:', req.url);
    try {
      const user = await USER.findById(req.userID).populate('cart.product');
  
      res.json(user.cart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));
  
  router.delete('/cart/remove/:productId', auth, asyncHandler(async (req, res) => {
    try {
      const { productId } = req.params;
      const user = await USER.findById(req.userID);
      const productIndex = user.cart.findIndex(item => item.product._id.toString() === productId);
  
      if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found in cart' });
      }
  
      user.cart.splice(productIndex, 1);
      await user.save();
  
      res.json({ message: 'Product removed from cart' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));
  
  router.delete('/cart/remove-all', auth, asyncHandler(async (req, res) => {
    try {
      const user = await USER.findById(req.userID);
  
      if (user.cart.length === 0) {
        return res.status(404).json({ error: 'Cart is already empty' });
      }
  
      user.cart = [];
      await user.save();
  
      res.json({ message: 'Cart cleared' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));
  
  router.post('/cart/add', auth, asyncHandler(async (req, res) => {
    try {
  
      const { productId, quantity } = req.body;
  
      const user = await USER.findById(req.userID);
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const myid = new mongoose.Types.ObjectId(productId);
  
      const existingCartItem = user.cart.find((item) => item.product.equals(myid));
  
      console.log("yolo", existingCartItem);
  
      if (existingCartItem) {
        await USER.findByIdAndUpdate(req.userID, {
          $inc: { "cart.$[elem].quantity": quantity }
        }, { arrayFilters: [{ "elem.product": existingCartItem.product }] });
      } else {
        user.cart.push({ product: productId, quantity });
        await user.save();
      }
  
      const updatedUser = await USER.findById(req.userID);
  
      res.json({ message: 'Product added to cart', updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));
  
  router.delete('/cart/remove-all', auth, asyncHandler(async (req, res) => {
    try {
      const user = await USER.findById(req.userID);
  
      if (user.cart.length === 0) {
        return res.status(404).json({ error: 'Cart is already empty' });
      }
  
      user.cart = [];
      await user.save();
  
      res.json({ message: 'Cart cleared' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));

  module.exports = router;
