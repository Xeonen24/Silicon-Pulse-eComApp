const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token verification failed' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = auth;
