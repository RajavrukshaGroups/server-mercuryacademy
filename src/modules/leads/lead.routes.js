import express from "express";

import leadController from "./lead.controller.js";

import validateRequest from "../../middleware/validate.middleware.js";

import {
  createLeadSchema,
  updateLeadSchema,
  leadQuerySchema,
  leadIdSchema,
} from "./lead.validation.js";
import authenticate from "../../middleware/authenticate.middleware.js";

const router = express.Router();

/**
 * Create Lead
 */
router.post("/", validateRequest(createLeadSchema), leadController.createLead);

/**
 * Get Leads
 */
router.get(
  "/",
  authenticate,
  validateRequest(leadQuerySchema),
  leadController.getLeads,
);

/**
 * Get Lead By ID
 */
router.get(
  "/:id",
  authenticate,
  validateRequest(leadIdSchema),
  leadController.getLeadById,
);

/**
 * Update Lead
 */
router.patch(
  "/:id",
  authenticate,
  validateRequest(updateLeadSchema),
  leadController.updateLead,
);

/**
 * Delete Lead
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(leadIdSchema),
  leadController.deleteLead,
);

export default router;
