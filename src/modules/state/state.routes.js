import { Router } from "express";

import stateController from "./state.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";

import {
  createStateSchema,
  updateStateSchema,
  stateQuerySchema,
  stateIdSchema,
} from "./state.validation.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { auditCreate, auditUpdate } from "../../middleware/audit.middleware.js";

const router = Router();

/**
 * Create State
 */
router.post(
  "/",
  authenticate,
  auditCreate,
  validateRequest(createStateSchema),
  stateController.createState,
);

/**
 * Get All States
 */
router.get("/", validateRequest(stateQuerySchema), stateController.getStates);

/**
 * Get State By ID
 */
router.get(
  "/:id",
  validateRequest(stateIdSchema),
  stateController.getStateById,
);

/**
 * Update State
 */
router.patch(
  "/:id",
  authenticate,
  auditUpdate,
  validateRequest(updateStateSchema),
  stateController.updateState,
);

/**
 * Delete State
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(stateIdSchema),
  stateController.deleteState,
);

export default router;
