import User from "../users/user.model.js";

import ApiError from "../../utils/ApiError.js";

import { hashPassword, comparePassword } from "../../utils/password.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";
import baseService from "../../services/base.service.js";

/**
 * Admin Login
 */
const login = async ({ email, password }) => {
  /**
   * Find User
   */
  const user = await User.findOne({
    email: email.trim().toLowerCase(),
    isDeleted: false,
  }).select("+password +refreshToken");

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  /**
   * Verify Password
   */
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password.");
  }

  /**
   * Generate Tokens
   */
  const accessToken = generateAccessToken({
    id: user._id,
  });

  const refreshToken = generateRefreshToken({
    id: user._id,
  });

  /**
   * Save Refresh Token
   */
  user.refreshToken = refreshToken;

  user.lastLogin = new Date();

  await user.save();

  /**
   * Remove Sensitive Fields
   */
  const userData = user.toObject();

  delete userData.password;
  delete userData.refreshToken;

  return {
    user: userData,
    accessToken,
    refreshToken,
  };
};

/**
 * Get Profile
 */
const getProfile = async (userId) => {
  return await baseService.findById(User, userId, ["profileImage"]);
};

/**
 * Change Password
 */
const changePassword = async (userId, payload) => {
  const { currentPassword, newPassword } = payload;

  /**
   * Find User
   */
  const user = await User.findById(userId).select("+password +refreshToken");

  if (!user || user.isDeleted) {
    throw new ApiError(404, "User not found.");
  }

  /**
   * Verify Current Password
   */
  const isPasswordValid = await comparePassword(currentPassword, user.password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Current password is incorrect.");
  }

  /**
   * Prevent Same Password
   */
  const isSamePassword = await comparePassword(newPassword, user.password);

  if (isSamePassword) {
    throw new ApiError(
      400,
      "New password cannot be the same as the current password.",
    );
  }

  /**
   * Update Password
   */
  user.password = await hashPassword(newPassword);

  user.passwordChangedAt = new Date();

  /**
   * Force Login Again
   */
  user.refreshToken = null;

  await user.save();

  return null;
};

/**
 * Logout
 */
const logout = async (userId) => {
  const user = await User.findById(userId).select("+refreshToken");

  if (!user || user.isDeleted) {
    throw new ApiError(404, "User not found.");
  }

  /**
   * Remove Refresh Token
   */
  user.refreshToken = null;

  await user.save();

  return null;
};

/**
 * Refresh Access Token
 */
const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token is required.");
  }

  /**
   * Verify JWT
   */
  const decoded = verifyRefreshToken(refreshToken);

  /**
   * Find User
   */
  const user = await User.findById(decoded.id).select("+refreshToken");

  if (!user || user.isDeleted) {
    throw new ApiError(401, "User not found.");
  }

  /**
   * Compare Stored Refresh Token
   */
  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Invalid refresh token.");
  }

  /**
   * Generate New Tokens
   */
  const newAccessToken = generateAccessToken({
    id: user._id,
  });

  const newRefreshToken = generateRefreshToken({
    id: user._id,
  });

  user.refreshToken = newRefreshToken;

  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

const authService = {
  login,
  getProfile,
  changePassword,
  logout,
  refreshAccessToken,
};

export default authService;
