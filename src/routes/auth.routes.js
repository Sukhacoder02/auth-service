const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const router = Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.get('/token/validate', AuthController.validateToken);
module.exports = router;
