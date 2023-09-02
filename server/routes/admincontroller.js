const express = require('express');
const asyncHandler = require('express-async-handler');
const auth = require('../midddleware/auth');
const USER = require('../model/user');
const UploadToCloudinary = require('../seed/imageUpload');
const Product = require('../model/product');
const Order = require('../model/orders')

const router = express.Router();

router.put("/update-user/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = req.body;
  
      const user = await USER.findByIdAndUpdate(userId, updatedUser, {
        new: true,
      });
  
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });
  
  router.delete("/delete-user/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await USER.findByIdAndRemove(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  router.delete("/delete-product/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  router.post('/add-product', asyncHandler(async (req, res) => {
    try {
      const { title, description, price, quantity,
        category, manufacturer, discountprice, productCode } = req.body;
  
      const image = req.files.image;
  
      if (!title || !description || !price || !quantity || !category || !manufacturer
        || !discountprice || !productCode || !image) {
        return res.status(422).json({ error: 'Please add all the fields' });
      }
  
  
      const imageUpload = await UploadToCloudinary(image, 'SiliconPulse');
  
      const newproduct = new Product({
        title, description, price, quantity,
        category, manufacturer, discountprice, productCode, imagePath: imageUpload.secure_url,
      });
  
      const product = await newproduct.save();
  
      return res.status(201).json({ message: 'Product added successfully', product });
  
  
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error in add cart' });
    }
  }));
  
  router.put('/update-product/:productId', async (req, res) => {
    const { productId } = req.params;
    const updates = req.body;
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: updates },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  router.get('/user-role', auth, (req, res) => {
    try {
      const userRole = req.session.user.role;
      res.status(200).json({ role: userRole });
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch user role' });
      console.log(err);
    }
  });
  
  router.get('/get-users', auth, asyncHandler(async (req, res) => {
    try {
      const users = await USER.find();
  
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Unable to fetch users' });
    }
  }))

  router.get('/get-orders',auth,asyncHandler(async(req,res)=>{
    try {
      const order = await Order.find();
      res.json(order);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Unable to fetch orders' });
    }
  }))

  router.put('/update-shipping/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    const { shipped } = req.body;
  
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { shipped },
        { new: true }
      );
  
      res.json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating shipped status' });
    }
  });

  module.exports = router;
