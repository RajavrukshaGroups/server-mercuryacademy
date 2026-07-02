import { Router } from "express";

import countryController from "./country.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";

import {
  createCountrySchema,
  updateCountrySchema,
  countryQuerySchema,
  countryIdSchema,
} from "./country.validation.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { auditCreate, auditUpdate } from "../../middleware/audit.middleware.js";

const router = Router();

/**
 * Create Country
 */
router.post(
  "/",
  authenticate,
  auditCreate,
  validateRequest(createCountrySchema),
  countryController.createCountry,
);

/**
 * Get All Countries
 */
router.get(
  "/",
  validateRequest(countryQuerySchema),
  countryController.getCountries,
);

/**
 * Get Country By ID
 */
router.get(
  "/:id",
  validateRequest(countryIdSchema),
  countryController.getCountryById,
);

/**
 * Update Country
 */
router.patch(
  "/:id",
  authenticate,
  auditUpdate,
  validateRequest(updateCountrySchema),
  countryController.updateCountry,
);

/**
 * Delete Country
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(countryIdSchema),
  countryController.deleteCountry,
);

export default router;
