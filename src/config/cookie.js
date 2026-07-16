import env from "./env.js";

/**
 * Access Token Cookie
 */
export const accessTokenOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 15 * 60 * 1000, // 15 Minutes
  // maxAge: 1 * 60 * 1000, // 15 Minutes
};

/**
 * Refresh Token Cookie
 */
export const refreshTokenOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
};
