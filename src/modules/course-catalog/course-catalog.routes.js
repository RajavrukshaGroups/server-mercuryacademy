import { Router } from "express";

import courseCatalogController from "./course-catalog.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";

import {
  createCourseCatalogSchema,
  updateCourseCatalogSchema,
  courseCatalogQuerySchema,
  courseCatalogIdSchema,
} from "./course-catalog.validation.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { auditCreate, auditUpdate } from "../../middleware/audit.middleware.js";

const router = Router();

/**
 * Create Course Catalog
 */
router.post(
  "/",
  authenticate,
  auditCreate,
  validateRequest(createCourseCatalogSchema),
  courseCatalogController.createCourseCatalog,
);

/**
 * Get All Course Catalogs
 */
router.get(
  "/",
  validateRequest(courseCatalogQuerySchema),
  courseCatalogController.getCourseCatalogs,
);

/**
 * Get Course Catalog By ID
 */
router.get(
  "/:id",
  authenticate,
  validateRequest(courseCatalogIdSchema),
  courseCatalogController.getCourseCatalogById,
);

/**
 * Update Course Catalog
 */
router.patch(
  "/:id",
  authenticate,
  auditUpdate,
  validateRequest(updateCourseCatalogSchema),
  courseCatalogController.updateCourseCatalog,
);

/**
 * Delete Course Catalog
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(courseCatalogIdSchema),
  courseCatalogController.deleteCourseCatalog,
);

export default router;
