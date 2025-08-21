import express from 'express';
import {
  makeComment,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentByPostId,
} from '../controllers/comment.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const commentRouter = express.Router();

commentRouter.post('/:postId', protect, makeComment);
commentRouter.put('/:commentId', protect, updateComment);
commentRouter.delete('/:commentId', protect, deleteComment);
commentRouter.get('/', getAllComments);
commentRouter.get('/post/:postId', getCommentByPostId);

export default commentRouter;
