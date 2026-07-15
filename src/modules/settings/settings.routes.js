import { Router } from "express";

import settingsController from "./settings.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { auditUpdate } from "../../middleware/audit.middleware.js";

import { updateSettingsSchema } from "./settings.validation.js";

const router = Router();

/**
 * Get Settings
 */
router.get("/", settingsController.getSettings);

/**
 * Update Settings
 */
router.patch(
  "/",
  authenticate,
  auditUpdate,
  validateRequest(updateSettingsSchema),
  settingsController.updateSettings,
);

export default router;
