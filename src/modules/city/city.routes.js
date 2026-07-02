import { Router } from "express";

import cityController from "./city.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";

import {
  createCitySchema,
  updateCitySchema,
  cityQuerySchema,
  cityIdSchema,
} from "./city.validation.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { auditCreate, auditUpdate } from "../../middleware/audit.middleware.js";

const router = Router();

/**
 * Create City
 */
router.post(
  "/",
  authenticate,
  auditCreate,
  validateRequest(createCitySchema),
  cityController.createCity,
);

/**
 * Get All Cities
 */
router.get("/", validateRequest(cityQuerySchema), cityController.getCities);

/**
 * Get City By ID
 */
router.get("/:id", validateRequest(cityIdSchema), cityController.getCityById);

/**
 * Update City
 */
router.patch(
  "/:id",
  authenticate,
  auditUpdate,
  validateRequest(updateCitySchema),
  cityController.updateCity,
);

/**
 * Delete City
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(cityIdSchema),
  cityController.deleteCity,
);

export default router;
