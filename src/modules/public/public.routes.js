import { Router } from "express";

import validate from "../../middleware/validate.middleware.js";

import {
  getPublicUniversity,
  getPublicUniversityCourse,
} from "./public.controller.js";

import {
  publicUniversitySlugSchema,
  publicUniversityCourseSlugSchema,
} from "./public.validation.js";

const router = Router();

router.get(
  "/universities/:universitySlug/courses/:courseSlug",
  validate(publicUniversityCourseSlugSchema),
  getPublicUniversityCourse,
);

router.get(
  "/universities/:slug",
  validate(publicUniversitySlugSchema),
  getPublicUniversity,
);

export default router;
