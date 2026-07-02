import { Router } from "express";

import approvalController from "./approval.controller.js";
import validateRequest from "../../middleware/validate.middleware.js";

import {
  createApprovalSchema,
  approvalQuerySchema,
  approvalIdSchema,
  updateApprovalSchema,
} from "./approval.validation.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { auditCreate, auditUpdate } from "../../middleware/audit.middleware.js";

const router = Router();

/**
 * Create Approval
 */
router.post(
  "/",
  authenticate,
  auditCreate,
  validateRequest(createApprovalSchema),
  approvalController.createApproval,
);

/**
 * Get All Approvals
 */
router.get(
  "/",
  validateRequest(approvalQuerySchema),
  approvalController.getApprovals,
);

router.get(
  "/:id",
  validateRequest(approvalIdSchema),
  approvalController.getApprovalById,
);

router.patch(
  "/:id",
  authenticate,
  auditUpdate,
  validateRequest(updateApprovalSchema),
  approvalController.updateApproval,
);

router.delete(
  "/:id",
  authenticate,
  validateRequest(approvalIdSchema),
  approvalController.deleteApproval,
);

export default router;
