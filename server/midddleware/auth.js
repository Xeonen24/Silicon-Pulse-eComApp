const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const auth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
}

module.exports = auth;