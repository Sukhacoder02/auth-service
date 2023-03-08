const AuthServices = require('./../services/auth.service');

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await AuthServices.register(username, password);
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await AuthServices.login(username, password);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const AuthController = { registerUser, loginUser };
module.exports = AuthController;
