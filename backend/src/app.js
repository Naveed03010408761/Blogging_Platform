import express from 'express';
import cors from 'cors';
import userRouter from './routers/user.routers.js';
import authRouter from './routers/auth.routers.js';
import postRouter from './routers/post.routers.js';
import commentRouter from './routers/comment.routers.js';
import likeRouter from './routers/like.routers.js';

const app = express();

console.log('CORS ORIGIN:', process.env.CORS_ORIGIN);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/likes', likeRouter);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
