import express from "express";

import universityCourseController from "./university-course.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";

import {
  createUniversityCourseSchema,
  updateUniversityCourseSchema,
  universityCourseQuerySchema,
  universityCourseIdSchema,
} from "./university-course.validation.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { auditCreate, auditUpdate } from "../../middleware/audit.middleware.js";

const router = express.Router();

/**
 * Create University Course
 */
router.post(
  "/",
  authenticate,
  auditCreate,
  validateRequest(createUniversityCourseSchema),
  universityCourseController.createUniversityCourse,
);

/**
 * Get University Courses
 */
router.get(
  "/",
  validateRequest(universityCourseQuerySchema),
  universityCourseController.getUniversityCourses,
);

/**
 * Get University Course By ID
 */
router.get(
  "/:id",
  validateRequest(universityCourseIdSchema),
  universityCourseController.getUniversityCourseById,
);

/**
 * Update University Course
 */
router.patch(
  "/:id",
  authenticate,
  auditUpdate,
  validateRequest(updateUniversityCourseSchema),
  universityCourseController.updateUniversityCourse,
);

/**
 * Delete University Course
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(universityCourseIdSchema),
  universityCourseController.deleteUniversityCourse,
);

export default router;
