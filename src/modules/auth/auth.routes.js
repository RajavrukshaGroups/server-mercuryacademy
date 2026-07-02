import express from "express";

import authController from "./auth.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/authenticate.middleware.js";

import { loginSchema, changePasswordSchema } from "./auth.validation.js";

const router = express.Router();

/**
 * Login
 */
router.post("/login", validateRequest(loginSchema), authController.login);
router.get("/profile", authenticate, authController.getProfile);
router.patch(
  "/change-password",
  authenticate,
  validateRequest(changePasswordSchema),
  authController.changePassword,
);

router.post("/logout", authenticate, authController.logout);
router.post("/refresh-token", authController.refreshToken);

export default router;
