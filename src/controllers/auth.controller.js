const AuthServices = require('./../services/auth.service');
const { storeToken, getToken } = require('./../utils/Redis/index');

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthServices.register(email, password);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await AuthServices.login(email, password);
    await storeToken(token, email);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const validateToken = async (req, res) => {
  try {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) {
      res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeaders && authHeaders.split(' ')[1];
    const user = await AuthServices.validate(token);
    const email = await getToken(token);
    if (!email) {
      res.status(401).json({ error: 'Invalid token' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const AuthController = { registerUser, loginUser, validateToken };
module.exports = AuthController;
