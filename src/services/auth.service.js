const db = require('../database/models');
const { encryptPassword, comparePassword } = require('../utils/Hashing');
const { generateToken, decodeToken } = require('../utils/JWT');

const register = async (email, password) => {
  const foundUser = await db.users.findOne({ where: { email } });
  if (foundUser) {
    throw new Error('User already exists');
  }
  const hashedPassword = await encryptPassword(password);
  const user = await db.users.create({
    email,
    password: hashedPassword,
  });
  return user;
};

const login = async (email, password) => {
  const foundUser = await db.users.findOne({ where: { email } });
  if (!foundUser) {
    throw new Error('User does not exist');
  }
  const isPasswordValid = await comparePassword(password, foundUser.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = generateToken({ email });
  return token;
};

const validate = async (token) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    throw new Error('Invalid token');
  }
  console.log(decodedToken);
  const email = decodedToken.user;
  const foundUserWithToken = await db.users.findOne({
    where: { email },
    attributes: ['id', 'email'],
  });
  return foundUserWithToken;
};

const AuthService = { register, login, validate };

module.exports = AuthService;
