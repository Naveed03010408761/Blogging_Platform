import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/auth.controllers.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', protect, logoutUser);

export default authRouter;
