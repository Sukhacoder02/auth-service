const db = require('../../src/database/models');
const HashingUtils = require('../../src/utils/Hashing');

const JWTUtils = require('../../src/utils/JWT');
const AuthService = require('../../src/services/auth.service');
jest.mock('../../src/utils/Hashing');
jest.mock('../../src/utils/JWT');
describe('AuthService', () => {
  const comparePassword = jest.fn().mockResolvedValue(true);
  describe('register service', () => {
    it('should create a new user in the database', async () => {
      const username = 'testuser';
      const password = 'testpassword';

      jest.spyOn(db.users, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(db.users, 'create').mockResolvedValueOnce({
        username,
        password: 'hashedPassword',
      });

      const user = await AuthService.register(username, password);
      expect(user).toBeDefined();
      expect(user.username).toBe(username);
    });

    it('should throw an error if the user already exists', async () => {
      const username = 'testuser';
      const password = 'testpassword';

      jest.spyOn(db.users, 'findOne').mockResolvedValueOnce({});
      // Create user
      await expect(AuthService.register(username, password)).rejects.toThrow(
        'User already exists'
      );
    });
  });
  describe('login service', () => {
    it('should return a token when the user exists and the password is valid', async () => {
      const username = 'testuser';
      const password = 'testpassword';

      jest.spyOn(db.users, 'findOne').mockResolvedValueOnce({
        username,
        password: 'hashedPassword',
      });
      jest.spyOn(HashingUtils, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(JWTUtils, 'generateToken').mockReturnValue('token');
      const token = await AuthService.login(username, password);
      expect(token).toBeDefined();
    });
    it('should throw an error when the user does not exist', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      jest.spyOn(db.users, 'findOne').mockResolvedValueOnce(null);
      await expect(AuthService.login(username, password)).rejects.toThrow(
        'User does not exist'
      );
    });
  });
  describe('validate service', () => {
    it('should return the user when the token is valid', async () => {
      jest.spyOn(JWTUtils, 'decodeToken').mockReturnValue({
        user: 'testuser',
      });
      jest.spyOn(db.users, 'findOne').mockResolvedValue({
        id: 1,
        username: 'testuser',
      });
      const user = await AuthService.validate('token');
      expect(user).toBeDefined();
    });
    it('should throw an error when the token is invalid', async () => {
      jest.spyOn(JWTUtils, 'decodeToken').mockReturnValue(null);
      expect(AuthService.validate('token')).rejects.toThrow('Invalid token');
    });
  });
});
