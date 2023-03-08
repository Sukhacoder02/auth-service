import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
const router = Router();

router.post('/register', AuthController.registerUser);

export default router;
