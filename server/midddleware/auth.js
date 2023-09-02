const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Session expires after 24 hours
  },
}));

function auth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = auth;
