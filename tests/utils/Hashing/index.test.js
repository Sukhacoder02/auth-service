const {
  encryptPassword,
  comparePassword,
} = require('../../../src/utils/Hashing');

describe('Hashing Utils', () => {
  describe('Function encryptPassword', () => {
    it('should return a hashed password', async () => {
      const hashedPassword = await encryptPassword('password');
      expect(hashedPassword).not.toEqual('password');
    });
  });
  describe('Function comparePassword', () => {
    it('should return true if the password is correct', async () => {
      const hashedPassword = await encryptPassword('password');
      const isCorrect = await comparePassword('password', hashedPassword);
      expect(isCorrect).toBeTruthy();
    });
    it('should return false if the password is incorrect', async () => {
      const hashedPassword = await encryptPassword('password');
      const isCorrect = await comparePassword('incorrect', hashedPassword);
      expect(isCorrect).toBeFalsy();
    });
  });
});
