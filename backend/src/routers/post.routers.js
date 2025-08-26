import express from 'express';
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  getPostsByUser,
} from '../controllers/post.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const postRouter = express.Router();

// Public routes
postRouter.get('/', getAllPosts);

postRouter.get('/my-posts', protect, getPostsByUser);
postRouter.get('/:id', getPost);

postRouter.post('/', protect, createPost);
postRouter.put('/:id', protect, updatePost);
postRouter.delete('/:id', protect, deletePost);

export default postRouter;
