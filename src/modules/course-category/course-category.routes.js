import { Router } from "express";

import courseCategoryController from "./course-category.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";

import {
  createCourseCategorySchema,
  updateCourseCategorySchema,
  courseCategoryQuerySchema,
  courseCategoryIdSchema,
} from "./course-category.validation.js";

const router = Router();

/**
 * Create
 */
router.post(
  "/",
  validateRequest(createCourseCategorySchema),
  courseCategoryController.createCourseCategory,
);

/**
 * Get All
 */
router.get(
  "/",
  validateRequest(courseCategoryQuerySchema),
  courseCategoryController.getCourseCategories,
);

/**
 * Get By ID
 */
router.get(
  "/:id",
  validateRequest(courseCategoryIdSchema),
  courseCategoryController.getCourseCategoryById,
);

/**
 * Update
 */
router.patch(
  "/:id",
  validateRequest(updateCourseCategorySchema),
  courseCategoryController.updateCourseCategory,
);

/**
 * Delete
 */
router.delete(
  "/:id",
  validateRequest(courseCategoryIdSchema),
  courseCategoryController.deleteCourseCategory,
);

export default router;
