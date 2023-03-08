const db = require('../database/models');
const { encryptPassword, comparePassword } = require('../utils/Hashing');
const { generateToken, decodeToken } = require('../utils/JWT');

const register = async (username, password) => {
  const foundUser = await db.users.findOne({ where: { username } });
  if (foundUser) {
    throw new Error('User already exists');
  }
  const hashedPassword = await encryptPassword(password);
  const user = await db.users.create({
    username,
    password: hashedPassword,
  });
  return user;
};

const login = async (username, password) => {
  const foundUser = await db.users.findOne({ where: { username } });
  if (!foundUser) {
    throw new Error('User does not exist');
  }
  const isPasswordValid = await comparePassword(password, foundUser.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = generateToken({ username });
  return token;
};

const validate = async (token) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    throw new Error('Invalid token');
  }
  console.log(decodedToken);
  const username = decodedToken.user;
  const foundUserWithToken = await db.users.findOne({
    where: { username },
    attributes: ['id', 'username'],
  });
  return foundUserWithToken;
};

const AuthService = { register, login, validate };

module.exports = AuthService;
