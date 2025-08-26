import apiError from '../ultils/apiError.js';
import apiResponse from '../ultils/apiResponse.js';
import asyncHandler from '../ultils/asyncHandler.js';
import User from '../models/user.models.js';
import Post from '../models/post.models.js';
import Comment from '../models/comment.models.js';

const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new apiError(401, 'Unauthorized. Please login.');
  }

  const user = await User.findById(userId).select('-password -refreshToken');

  if (!user) {
    throw new apiError(404, 'User not found.');
  }

  return res
    .status(200)
    .json(new apiResponse(200, 'Profile fetched successfully.', user));
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { userName, location, bio, website } = req.body;

  const updateData = {};

  if (userName !== undefined) {
    if (userName.trim() == '') {
      throw new apiError(400, 'userName can not be empty.');
    }
    updateData.userName = userName.trim();
  }

  if (location !== undefined) {
    updateData.location = location.trim();
  }

  if (bio !== undefined) {
    updateData.bio = bio.trim();
  }

  if (website !== undefined) {
    updateData.website = website.trim();
  }

  if (Object.keys(updateData).length === 0) {
    throw new apiError(400, 'No valid data is provided for update');
  }
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select('-password -refreshToken');

  if (!user) {
    throw new apiError(404, 'User not found.');
  }

  return res
    .status(200)
    .json(new apiResponse(200, 'Profile updated successfully.', user));
});

const deleteProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new apiError(404, 'User not found.');
  }

  await Post.deleteMany({ author: userId });
  await Comment.deleteMany({ author: userId });

  await User.findByIdAndDelete(userId);

  return res
    .status(200)
    .json(new apiResponse(200, 'Profile deleted successfully.'));
});

export { getProfile, updateProfile, deleteProfile };
