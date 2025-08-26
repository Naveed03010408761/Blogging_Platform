import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from '../controllers/user.controllers.js';

const userRouter = express.Router();

//protect: middleware to make sure that only provide profile if user is logged in
userRouter.get('/profile', protect, getProfile);
userRouter.patch('/profile', protect, updateProfile);
userRouter.delete('/profile', protect, deleteProfile);
export default userRouter;
