const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'secret';

const generateToken = (user) => {
  const data = {
    date: Date(),
    user: user.email,
  };
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const decodeToken = (token) => {
  const decoded = jwt.decode(token, JWT_SECRET);
  if (!decoded) return null;
  return decoded;
};
const JWTUtils = { generateToken, decodeToken };
module.exports = JWTUtils;
