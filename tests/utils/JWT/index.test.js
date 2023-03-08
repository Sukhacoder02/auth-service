const { generateToken, decodeToken } = require('../../../src/utils/JWT');

describe('JWT Utils', () => {
  describe('Function generateToken', () => {
    it('should return a token', () => {
      const user = { username: 'user' };
      const token = generateToken(user);
      expect(token).toBeTruthy();
    });
  });
  describe('Function decodeToken', () => {
    it('Should decode the token ', () => {
      const token = decodeToken(
        generateToken({
          username: 'user',
        })
      );
      expect(token).toBeTruthy();
    });
  });
});
