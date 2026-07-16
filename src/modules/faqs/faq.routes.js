import { Router } from "express";

import faqController from "./faq.controller.js";

import authenticate from "../../middleware/authenticate.middleware.js";
import validateRequest from "../../middleware/validate.middleware.js";

import {
  createFaqSchema,
  updateFaqSchema,
  faqIdSchema,
  faqQuerySchema,
} from "./faq.validation.js";

const router = Router();

/**
 * Create FAQ
 */
router.post(
  "/",
  authenticate,
  validateRequest(createFaqSchema),
  faqController.createFaq,
);

/**
 * Get FAQs
 */
router.get(
  "/",
  authenticate,
  validateRequest(faqQuerySchema),
  faqController.getFaqs,
);

/**
 * Get FAQ By Id
 */
router.get(
  "/:id",
  authenticate,
  validateRequest(faqIdSchema),
  faqController.getFaqById,
);

/**
 * Update FAQ
 */
router.patch(
  "/:id",
  authenticate,
  validateRequest(updateFaqSchema),
  faqController.updateFaq,
);

/**
 * Delete FAQ
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(faqIdSchema),
  faqController.deleteFaq,
);

export default router;
