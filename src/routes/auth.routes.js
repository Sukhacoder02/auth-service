const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const { Schemas, validate } = require('../middlewares/auth.validator');
const router = Router();

router.post(
  '/register',
  validate(Schemas.registerSchema, 'body'),
  AuthController.registerUser
);
router.post(
  '/login',
  validate(Schemas.loginSchema, 'body'),
  AuthController.loginUser
);
router.get(
  '/token/validate',
  validate(Schemas.tokenHeaderSchema, 'headers'),
  AuthController.validateToken
);
module.exports = router;
