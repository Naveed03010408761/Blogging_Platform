import Post from '../models/post.models.js';
import apiError from '../ultils/apiError.js';
import apiResponse from '../ultils/apiResponse.js';
import asyncHandler from '../ultils/asyncHandler.js';

const toggleLike = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(postId);
  if (!post) {
    throw new apiError(404, 'Post not found.');
  }

  const alreadyLiked = post.likes.includes(userId);
  if (alreadyLiked) {
    post.likes.pull(userId);
    post.likeCount = Math.max(0, post.likeCount - 1);
  } else {
    post.likes.push(userId);
    post.likeCount += 1;
  }

  await post.save();
  res.status(200).json(
    new apiResponse(200, alreadyLiked ? 'Post unliked' : 'Post liked', {
      likeCount: post.likeCount,
      isLiked: !alreadyLiked,
    })
  );
});

// Get like information for a post

const getLikes = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId)
    .populate('likes', 'userName email')
    .select('likes likeCount');

  if (!post) {
    throw new apiError(404, 'Post not found.');
  }

  let isLikedByCurrentUser = false;
  if (req.user) {
    isLikedByCurrentUser = post.likes.some((like) => {
      return like._id.toString() === req.user._id.toString();
    });
  }

  res.status(200).json(
    new apiResponse(200, 'Likes retrieved successfully', {
      likeCount: post.likeCount,
      likes: post.likes,
      isLiked: isLikedByCurrentUser,
    })
  );
});

export { toggleLike, getLikes };
