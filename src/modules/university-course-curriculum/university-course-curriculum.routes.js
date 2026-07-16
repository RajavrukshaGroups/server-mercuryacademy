import { Router } from "express";

import universityCourseCurriculumController from "./university-course-curriculum.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { auditCreate, auditUpdate } from "../../middleware/audit.middleware.js";

import {
  createUniversityCourseCurriculumSchema,
  updateUniversityCourseCurriculumSchema,
  universityCourseCurriculumIdSchema,
  universityCourseCurriculumQuerySchema,
} from "./university-course-curriculum.validation.js";

const router = Router();

/**
 * Create Curriculum
 */
router.post(
  "/",
  authenticate,
  auditCreate,
  validateRequest(createUniversityCourseCurriculumSchema),
  universityCourseCurriculumController.createUniversityCourseCurriculum,
);

/**
 * Get All Curriculums
 */
router.get(
  "/",
  validateRequest(universityCourseCurriculumQuerySchema),
  universityCourseCurriculumController.getUniversityCourseCurriculums,
);

/**
 * Get Curriculum By ID
 */
router.get(
  "/:id",
  validateRequest(universityCourseCurriculumIdSchema),
  universityCourseCurriculumController.getUniversityCourseCurriculumById,
);

/**
 * Update Curriculum
 */
router.patch(
  "/:id",
  authenticate,
  auditUpdate,
  validateRequest(updateUniversityCourseCurriculumSchema),
  universityCourseCurriculumController.updateUniversityCourseCurriculum,
);

/**
 * Delete Curriculum
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(universityCourseCurriculumIdSchema),
  universityCourseCurriculumController.deleteUniversityCourseCurriculum,
);

export default router;
