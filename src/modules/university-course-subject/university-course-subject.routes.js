import { Router } from "express";

import universityCourseSubjectController from "./university-course-subject.controller.js";

import authenticate from "../../middleware/authenticate.middleware.js";
import validateRequest from "../../middleware/validate.middleware.js";

import { auditCreate, auditUpdate } from "../../middleware/audit.middleware.js";

import {
  createUniversityCourseSubjectSchema,
  updateUniversityCourseSubjectSchema,
  universityCourseSubjectIdSchema,
  universityCourseSubjectQuerySchema,
} from "./university-course-subject.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  auditCreate,
  validateRequest(createUniversityCourseSubjectSchema),
  universityCourseSubjectController.createUniversityCourseSubject,
);

router.get(
  "/",
  validateRequest(universityCourseSubjectQuerySchema),
  universityCourseSubjectController.getUniversityCourseSubjects,
);

router.get(
  "/:id",
  validateRequest(universityCourseSubjectIdSchema),
  universityCourseSubjectController.getUniversityCourseSubjectById,
);

router.patch(
  "/:id",
  authenticate,
  auditUpdate,
  validateRequest(updateUniversityCourseSubjectSchema),
  universityCourseSubjectController.updateUniversityCourseSubject,
);

router.delete(
  "/:id",
  authenticate,
  validateRequest(universityCourseSubjectIdSchema),
  universityCourseSubjectController.deleteUniversityCourseSubject,
);

export default router;
