import { Router } from "express";

import {
  createUniversityCourseSubject,
  getUniversityCourseSubjects,
  getUniversityCourseSubjectById,
  updateUniversityCourseSubject,
  deleteUniversityCourseSubject,
} from "./university-course-subject.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";

import { universityCourseSubjectSchema } from "./university-course-subject.validation.js";

const router = Router();

router.get("/", getUniversityCourseSubjects);

router.get("/:id", getUniversityCourseSubjectById);

router.post(
  "/",
  validateRequest(universityCourseSubjectSchema),
  createUniversityCourseSubject,
);

router.patch(
  "/:id",
  validateRequest(universityCourseSubjectSchema),
  updateUniversityCourseSubject,
);

router.delete("/:id", deleteUniversityCourseSubject);

export default router;
