const jwt = require('jsonwebtoken');
const USER = require('../model/user');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken || req.headers('Authorization').replace('Bearer ', '');
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const rootUser = await USER.findOne({
      _id: verifyToken._id,
      'tokens.token': token
    });
    if (!rootUser) {
      throw new Error('User does not exist');
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send('Not authorized: No token available');
    console.log(err);
  }
};

module.exports = auth;