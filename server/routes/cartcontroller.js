
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
    const userId = req.user.id; // Extract the 'id' field
    console.log(userId)

    const user = await USER.findById(userId);
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Convert productId to a valid ObjectId
    const productObjectId = productId;

    const existingCartItem = user.cart.find((item) => item.product.equals(productObjectId));

    if (existingCartItem) {
      // Update the quantity of the existing cart item
      await USER.updateOne(
        { _id: userId, 'cart.product': productObjectId },
        { $inc: { 'cart.$.quantity': quantity } }
      );
    } else {
      // Add the product to the cart
      user.cart.push({ product: productObjectId, quantity });
      await user.save();
    }

    // Retrieve the updated user with cart details
    const updatedUser = await USER.findById(userId);

    res.json({ message: 'Product added to cart', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}));
  
  router.post('/cart/inc', auth, asyncHandler(async (req, res) => {
    try {
  
      const { productId, quantity } = req.body;
  
      const user = await USER.findById(req.user.id);
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const myid = new mongoose.Types.ObjectId(productId);
  
      const existingCartItem = user.cart.find((item) => item.product.equals(myid));
    
      if (existingCartItem) {
        await USER.findByIdAndUpdate(req.user.id, {
          $inc: { "cart.$[elem].quantity": quantity }
        }, { arrayFilters: [{ "elem.product": existingCartItem.product }] });
      } else {
        user.cart.push({ product: productId, quantity });
        await user.save();
      }
  
      const updatedUser = await USER.findById(req.user.id);
  
      res.json({ message: 'Product added to cart', updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));
  
  router.post('/cart/dec', auth, asyncHandler(async (req, res) => {
    try {
      const { productId, quantity } = req.body;
  
      const user = await USER.findById(req.user.id);
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const myid = new mongoose.Types.ObjectId(productId);
  
      const existingCartItem = user.cart.find((item) => item.product.equals(myid));
    
      if (existingCartItem) {
        const newQuantity = existingCartItem.quantity - 1;
        if (newQuantity <= 0) {
          // Remove the item from the cart if the new quantity is zero or negative
          await USER.findByIdAndUpdate(req.user.id, {
            $pull: { cart: { product: existingCartItem.product } }
          });
        } else {
          // Update the quantity of the existing item
          await USER.findByIdAndUpdate(req.user.id, {
            $set: { "cart.$[elem].quantity": newQuantity }
          }, { arrayFilters: [{ "elem.product": existingCartItem.product }] });
        }
      } else {
        // Add the item to the cart
        user.cart.push({ product: productId, quantity: 1 });
        await user.save();
      }
  
      const updatedUser = await USER.findById(req.user.id);
  
      res.json({ message: 'Product added to cart', updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));
  
  
  router.get('/cart', auth, asyncHandler(async (req, res) => {
    try {
      const user = await USER.findById(req.user.id).populate('cart.product');
  
      res.json(user.cart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));
  
  router.delete('/cart/remove/:productId', auth, asyncHandler(async (req, res) => {
    try {
      const { productId } = req.params;
      const user = await USER.findById(req.user.id);
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
      const user = await USER.findById(req.user.id);
  
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
  
      const user = await USER.findById(req.user.id);
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const myid = new mongoose.Types.ObjectId(productId);
  
      const existingCartItem = user.cart.find((item) => item.product.equals(myid));
    
      if (existingCartItem) {
        await USER.findByIdAndUpdate(req.user.id, {
          $inc: { "cart.$[elem].quantity": quantity }
        }, { arrayFilters: [{ "elem.product": existingCartItem.product }] });
      } else {
        user.cart.push({ product: productId, quantity });
        await user.save();
      }
  
      const updatedUser = await USER.findById(req.user.id);
  
      res.json({ message: 'Product added to cart', updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  }));
  
  router.delete('/cart/remove-all', auth, asyncHandler(async (req, res) => {
    try {
      const user = await USER.findById(req.user.id);
  
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
