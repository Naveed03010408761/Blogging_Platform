import Post from '../models/post.models.js';
import apiError from '../ultils/apiError.js';
import apiResponse from '../ultils/apiResponse.js';
import asyncHandler from '../ultils/asyncHandler.js';

// const createPost = asyncHandler(async (req, res) => {
//   const { title, content } = req.body;

//   if (!title || !content) {
//     throw new apiError(400, "Title and content are required.");
//   }

//   const post = await Post.create({
//     user: req.user._id,
//     title,
//     content,
//     author: req.user.username,
//   });

//   res
//     .status(201)
//     .json(new apiResponse(201, "Post created successfully.", post));
// });

const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!req.user) {
    throw new apiError(401, 'User not authenticated');
  }

  if (!title || !content) {
    throw new apiError(400, 'Title and content are required.');
  }

  const post = await Post.create({
    user: req.user._id,
    title,
    content,
    author: req.user.username,
  });

  res
    .status(201)
    .json(new apiResponse(201, 'Post created successfully.', post));
});
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate('user', 'name email');
  if (!posts) {
    return res.status(404).json(new apiResponse(404, 'Post not found.'));
  }
  return res
    .status(200)
    .json(new apiResponse(200, 'Posts retrieved successfully.', posts));
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!post) {
    return res.status(404).json(new apiResponse(404, 'Post not found.'));
  }

  return res
    .status(200)
    .json(new apiResponse(200, 'Post retrieved successfully.', post));
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new apiError(400, 'All fields are required.');
  }

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );

  if (!post) {
    throw new apiError(404, 'No post found.');
  }

  res
    .status(200)
    .json(new apiResponse(200, 'Post updated successfully.', post));
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    throw new apiError(404, 'Post not found.');
  }

  res
    .status(200)
    .json(new apiResponse(200, 'Post deleted successfully.', post));
});

export { createPost, getAllPosts, getPost, updatePost, deletePost };
