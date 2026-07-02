import express from "express";

import specializationController from "./specialization.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";

import {
  createSpecializationSchema,
  updateSpecializationSchema,
  specializationQuerySchema,
  specializationIdSchema,
} from "./specialization.validation.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { auditCreate, auditUpdate } from "../../middleware/audit.middleware.js";

const router = express.Router();

/**
 * Create Specialization
 */
router.post(
  "/",
  authenticate,
  auditCreate,
  validateRequest(createSpecializationSchema),
  specializationController.createSpecialization,
);

/**
 * Get Specializations
 */
router.get(
  "/",
  validateRequest(specializationQuerySchema),
  specializationController.getSpecializations,
);

/**
 * Get Specialization By ID
 */
router.get(
  "/:id",
  validateRequest(specializationIdSchema),
  specializationController.getSpecializationById,
);

/**
 * Update Specialization
 */
router.patch(
  "/:id",
  authenticate,
  auditUpdate,
  validateRequest(updateSpecializationSchema),
  specializationController.updateSpecialization,
);

/**
 * Delete Specialization
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(specializationIdSchema),
  specializationController.deleteSpecialization,
);

export default router;
