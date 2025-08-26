import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import asyncHandler from '../ultils/asyncHandler.js';
import apiError from '../ultils/apiError.js';
import { generateAccessToken } from '../ultils/generateTokens.utils.js';

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token;

    // Check Authorization header first
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for accessToken cookie
    else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }
    // Check for refreshToken cookie as fallback
    else if (req.cookies && req.cookies.refreshToken) {
      token = req.cookies.refreshToken;
    }

    if (!token) {
      throw new apiError(401, 'Not authorized, no token');
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || process.env.ACCESS_TOKEN_SECRET
      );
    } catch (verifyError) {
      // Handle token expiration specifically
      if (verifyError.name === 'TokenExpiredError') {
        // Try to get refresh token from various sources
        const refreshToken =
          req.cookies?.refreshToken ||
          req.headers['x-refresh-token'] ||
          (req.headers.authorization &&
          req.headers.authorization.startsWith('Refresh ')
            ? req.headers.authorization.split(' ')[1]
            : null);

        if (refreshToken) {
          try {
            const decodedRefresh = jwt.verify(
              refreshToken,
              process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET
            );

            // Generate new access token
            const newAccessToken = generateAccessToken(decodedRefresh.id);

            // Set new access token in response header for frontend to capture
            res.setHeader('x-new-access-token', newAccessToken);

            // Set user and continue
            req.user = await User.findById(decodedRefresh.id).select(
              '-password'
            );
            if (!req.user) {
              throw new apiError(401, 'Not authorized, user not found');
            }

            return next();
          } catch (refreshError) {
            throw new apiError(401, 'Not authorized, please login again');
          }
        }
      }
      throw new apiError(401, 'Not authorized, invalid token');
    }

    // Extract user ID
    const userId = decoded.id || decoded.userId || decoded._id;

    if (!userId) {
      throw new apiError(401, 'Not authorized, invalid token structure');
    }

    req.user = await User.findById(userId).select('-password');

    if (!req.user) {
      throw new apiError(401, 'Not authorized, user not found');
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new apiError(401, 'Not authorized, invalid token');
    }
    if (error.name === 'TokenExpiredError') {
      throw new apiError(401, 'Not authorized, token expired');
    }

    throw error;
  }
});

export { protect };
