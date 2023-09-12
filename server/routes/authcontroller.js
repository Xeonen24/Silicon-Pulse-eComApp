const express = require('express');
const asyncHandler = require('express-async-handler');
const validator = require('validator');
const auth = require('../midddleware/auth');
const USER = require('../model/user');
const mailSender = require('../midddleware/mailSender');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


function generateToken(user) {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
}

  router.post("/signup", asyncHandler(async (req, res) => {
    const { username, email, password, password2 } = req.body;
    if (!username || !email || !password || !password2) {
      return res.status(403).json({ error: "Please fill in all details" });
    }
    try {
      const userExists = await USER.findOne({ username: username });
      const emailExists = await USER.findOne({ email: email });
      if (userExists || emailExists) {
        return res.status(422).json({ error: "User already exists" });
      } else if (password !== password2) {
        return res.status(422).json({ error: "Passwords do not match" });
      } else if (!email || validator.isEmail.email) {
        return res.status(422).json({ error: "Email address is not valid" });
      } else {
        const user = new USER({
          username,
          email,
          password,
          password2,
        });
        await user.save();
        res.status(201).json({ message: "User registered" });
      }
    } catch (err) {
      const errors = {};
      if (err.errors) {
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });
      }
      console.log(errors);
      res.status(422).json({ errors });
    }
    }
  ));
  
  router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await USER.findOne({ username });
  
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
  
    res.header('Authorization', `Bearer ${token}`).json({ message: 'Authentication successful' });
  }));  

  router.post('/logout', async (req, res) => {
    res.clearCookie("jwtoken", {
      path: '/',
      domain: 'vercel.app',
    });
    res.status(200).json({ message: "User signed out" });
  });

  router.get('/user', auth, asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const user = await USER.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

  router.post("/update-profile", auth, asyncHandler(async (req, res) => {
    try {
      const finduser = await USER.findById(req.user.id);
      if (finduser) {
        const { username, previousPassword, newPassword } = req.body.updatedProfile;
        const existingUser = await USER.findOne({ username });
        if (existingUser) {
          return res.status(422).json({ error: "Username already exists" });
        }
  
        if (previousPassword !== finduser.password) {
          return res.status(422).json({ error: "Incorrect previous password" });
        } else {
          finduser.username = username;
          finduser.password = newPassword;
          await finduser.save();
          res.status(201).send("Profile updated successfully");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to update profile" });
    }
    }
  ));
  
  router.post("/send-mail", asyncHandler(async (req, res) => {
    try {
      const { msg } = req.body;
  
      // Construct the email template
      const emailTemplate = `
        <p><strong>Name:</strong> ${msg.name}</p>
        <p><strong>Email:</strong> ${msg.email}</p>
        <p><strong>Message:</strong> ${msg.message}</p>
      `;
  
      // Send the email
      const mailres = await mailSender("captainsparkelz32@gmail.com", "Customer Email", emailTemplate);
  
      if (mailres) {
        return res.status(200).json({ message: "Email sent successfully!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error in mail send" });
    }
    }
  ));

  module.exports = router;

