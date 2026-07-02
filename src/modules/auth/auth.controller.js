import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import authService from "./auth.service.js";

import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../../config/cookie.js";

/**
 * Login
 */
const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res.cookie("accessToken", accessToken, accessTokenOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  return res.status(200).json(
    new ApiResponse(200, "Login successful.", {
      user,
      accessToken,
      refreshToken,
    }),
  );
});

/**
 * Get Profile
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile fetched successfully.", user));
});

/**
 * Change Password
 */
const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.user._id, req.body);

  res.clearCookie("accessToken");

  res.clearCookie("refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Password changed successfully. Please login again.",
      ),
    );
});

/**
 * Logout
 */
const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user._id);

  res.clearCookie("accessToken", accessTokenOptions);

  res.clearCookie("refreshToken", refreshTokenOptions);

  return res.status(200).json(new ApiResponse(200, "Logged out successfully."));
});

/**
 * Refresh Token
 */
const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;

  const tokens = await authService.refreshAccessToken(token);

  res.cookie("accessToken", tokens.accessToken, accessTokenOptions);

  res.cookie("refreshToken", tokens.refreshToken, refreshTokenOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, "Token refreshed successfully.", tokens));
});

const authController = {
  login,
  getProfile,
  changePassword,
  logout,
  refreshToken,
};

export default authController;
