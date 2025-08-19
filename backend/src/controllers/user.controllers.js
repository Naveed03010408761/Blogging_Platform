import apiError from "../ultils/apiError.js";
import apiResponse from "../ultils/apiResponse.js";
import asyncHandler from "../ultils/asyncHandler.js";
import User from "../models/user.models.js"

const createProfile = asyncHandler(async (req, res) => {
  const { userName, location } = req.body;

  const userId = req.user?._id;
  if (!userId) {
    throw new apiError(401, "Unauthorized. User ID missing.");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "User not found.");
  }

  if (userName && userName.trim() !== "") {
    user.userName = userName.trim();
  }
  if (location && location.trim() !== "") {
    user.location = location.trim();
  }

  await user.save();

  return res
    .status(200)
    .json(new apiResponse(200, "User profile updated successfully.", user));
});

const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new apiError(401, "Unauthorized. Please login.");
  }

  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new apiError(404, "User not found.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Profile fetched successfully.", user));
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { userName, location } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { userName, location },
    { new: true },
  );

  if (!user) {
    throw new apiError(404, "User not found.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Profile updated successfully.", user));
});

const deleteProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new apiError(404, "User not found.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Profile deleted successfully."));
});

export { createProfile, getProfile, updateProfile, deleteProfile };
