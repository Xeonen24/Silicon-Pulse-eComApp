const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

function auth(req, res, next) {
  const token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const jwtToken = token.split(' ')[1];

  try {
    const decoded = jwt.verify(jwtToken, secretKey);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
}

module.exports = auth;
