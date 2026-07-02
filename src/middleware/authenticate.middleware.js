import jwt from "jsonwebtoken";

import User from "../modules/users/user.model.js";

import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";

const authenticate = async (req, res, next) => {
  try {
    /**
     * Get Token
     */
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.cookies.accessToken;

    if (!token) {
      throw new ApiError(401, "Authentication required.");
    }

    /**
     * Verify Token
     */
    const decoded = jwt.verify(token, env.JWT_SECRET);

    /**
     * Find User
     */
    const user = await User.findById(decoded.id);

    if (!user || user.isDeleted) {
      throw new ApiError(401, "User not found.");
    }

    /**
     * Attach User
     */
    req.user = user;

    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token."));
  }
};

export default authenticate;
