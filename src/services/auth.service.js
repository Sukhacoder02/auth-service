import db from '../database/models';

const register = async (username, password) => {
  const user = await db.users.create({ username, password });
  return user;
};

const AuthService = { register };

export default AuthService;
