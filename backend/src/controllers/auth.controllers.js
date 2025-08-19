import apiError from "../ultils/apiError.js";
import apiResponse from "../ultils/apiResponse.js";
import asyncHandler from "../ultils/asyncHandler.js";
import User from "../models/user.models.js";
import {
  generateAccessToken, generateRefreshToken
} from "../ultils/generateTokens.utils.js"

const registerUser = asyncHandler(async (req, res, next) => {
  const { userName, email, password, avatar } = req.body;

  if (!userName || !email || !password) {
    throw new apiError(400, "All fields are required.");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new apiError(400, "User already exists.");
  }

  const newUser = await User.create({
    userName,
    email,
    password,
    avatar,
  });

  if (!newUser) {
    throw new apiError(400, "User creation failed.");
  }

  const accessToken = generateAccessToken(newUser._id);
  const refreshToken = generateRefreshToken(newUser._id);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(201, "User created successfully.", newUser));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!email && !userName) {
    throw new apiError(400, "Email or Username is required.");
  }

  if (!password) {
    throw new apiError(400, "Password is required.");
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new apiError(404, "User not found.");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new apiError(401, "Invalid credentials.");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(200, "User logged in successfully", {
        user,
        accessToken,
        refreshToken,
      }),
    );
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { refreshToken: null },
    { new: true },
  );

  if (!user) {
    throw new apiError(404, "User not found.");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, "User logged out successfully."));
});

export { registerUser, loginUser, logoutUser };
