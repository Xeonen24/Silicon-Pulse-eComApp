const express = require('express');
const asyncHandler = require('express-async-handler');
const validator = require('validator');
const auth = require('../midddleware/auth');
const USER = require('../model/user');
const mailSender = require('../midddleware/mailSender');
const userAddress = require('../model/userAddress');

const router = express.Router();

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
  }));
  
    // router.post("/login", async (req, res) => {
    //   try {
    //     const { username, password } = req.body;
        
    //     const user = await USER.findOne({ username });

    //       if (!user) {
    //       return res.status(400).json({ message: "Invalid credentials" });
    //     }
    //     const passwordMatch = await bcrypt.compare(password, user.password);

    //     if (!passwordMatch) {
    //       return res.status(400).json({ message: "Invalid credentials" });
    //     }
    //       const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    //       expiresIn: "1h",
    //     });
    //       res.cookie("jwtoken", token, {
    //       maxAge: 2 * 24 * 60 * 60 * 1000,
    //       httpOnly: false,
    //       sameSite: "Lax",
    //       secure: false, 
    //     });
    //       user.tokens = user.tokens.concat({ token });
    //     await user.save();
    
    //     res.status(200).json({ message: "User signed in" });
    //   } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ error: "Failed to sign in" });
    //   }
    // });
    
    router.post('/login', async (req, res) => {
      try {
        const { username, password } = req.body;
    
        const user = await USER.findOne({ username: username });
    
        if (!user || user.password !== password) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = generateToken(user);
    
        // user.tokens = user.tokens.concat({ token });
        // await user.save();
    
        res.cookie('jwtoken', token, { httpOnly: true, domain: 'vercel.app', secure: true });
    
        res.status(200).json({ message: 'Login successful' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    });
    

  router.post('/logout', async (req, res) => {
    res.clearCookie("jwtoken", {
      path: '/',
      domain: 'localhost'
    });
    res.status(200).json({ message: "User signed out" });
  });

  router.get("/user", auth, async (req, res) => {
    try {
      const user = await USER.findById(req.userID).select('-password -password2');
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post("/update-profile", auth, asyncHandler(async (req, res) => {
    try {
      const finduser = await USER.findById(req.userID);
      if (finduser) {
        const { username, previousPassword, newPassword } = req.body;
  
        const existingUser = await USER.findOne({ username: username });
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
          console.log("User profile updated");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to update profile" });
    }
  }));
  
  router.get("/user", auth, async (req, res) => {
    try {
      const user = await USER.findById(req.userID).select('-password -password2');
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

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
  }));

  module.exports = router;

