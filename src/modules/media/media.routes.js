import express from "express";

import mediaController from "./media.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";
import upload from "../../middleware/upload.middleware.js";

import {
  createMediaSchema,
  updateMediaSchema,
  mediaQuerySchema,
  mediaIdSchema,
} from "./media.validation.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { auditCreate, auditUpdate } from "../../middleware/audit.middleware.js";

const router = express.Router();

/**
 * Upload Media
 */
router.post(
  "/upload",
  upload.single("file"),
  authenticate,
  // auditCreate,
  validateRequest(createMediaSchema),
  mediaController.uploadMedia,
);

/**
 * Get Media
 */
router.get(
  "/",
  authenticate,
  validateRequest(mediaQuerySchema),
  mediaController.getMedia,
);

/**
 * Get Media By ID
 */
router.get(
  "/:id",
  authenticate,
  validateRequest(mediaIdSchema),
  mediaController.getMediaById,
);

/**
 * Update Media
 */
router.patch(
  "/:id",
  authenticate,
  // auditUpdate,
  validateRequest(updateMediaSchema),
  mediaController.updateMedia,
);

/**
 * Delete Media
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(mediaIdSchema),
  mediaController.deleteMedia,
);

export default router;
