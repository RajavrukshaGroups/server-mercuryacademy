import { Router } from "express";

import universityController from "./university.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";
import { auditCreate, auditUpdate } from "../../middleware/audit.middleware.js";

import {
  createUniversitySchema,
  updateUniversitySchema,
  universityQuerySchema,
  universityIdSchema,
  universitySlugSchema,
  universityIdentifierSchema,
} from "./university.validation.js";
import authenticate from "../../middleware/authenticate.middleware.js";

const router = Router();

/**
 * Create University
 */
router.post(
  "/",
  authenticate,
  auditCreate,
  validateRequest(createUniversitySchema),
  universityController.createUniversity,
);

/**
 * Get All Universities
 */
router.get(
  "/",
  validateRequest(universityQuerySchema),
  universityController.getUniversities,
);

router.get("/export", universityController.exportUniversities);

/**
 * Get University By Slug
 * Must remain above /:id
 */
// router.get(
//   "/slug/:slug",
//   validateRequest(universitySlugSchema),
//   universityController.getUniversityBySlug,
// );

/**
 * Get University By ID
 */
// router.get(
//   "/:id",
//   validateRequest(universityIdSchema),
//   universityController.getUniversityById,
// );

/**
 * Get Published University By ID Or Slug
 * Keep after all fixed GET routes such as /export
 */
router.get(
  "/:identifier",
  validateRequest(universityIdentifierSchema),
  universityController.getUniversityByIdentifier,
);

/**
 * Update University
 */
router.patch(
  "/:id",
  authenticate,
  auditUpdate,
  validateRequest(updateUniversitySchema),
  universityController.updateUniversity,
);

/**
 * Delete University
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(universityIdSchema),
  universityController.deleteUniversity,
);

export default router;
