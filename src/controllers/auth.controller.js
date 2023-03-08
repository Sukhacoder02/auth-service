import AuthServices from './../services/auth.service';

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await AuthServices.register(username, password);
  return res.status(201).json({ user });
};

const AuthController = { registerUser };
export default AuthController;
