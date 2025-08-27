import express from 'express';
import { toggleLike, getLikes } from '../controllers/like.controllers.js';
import { protect } from '../middlewares/auth.middleware.js';

const likeRouter = express.Router();

likeRouter.post('/:postId/toggle', protect, toggleLike);
likeRouter.get('/:postId', getLikes);

export default likeRouter;
