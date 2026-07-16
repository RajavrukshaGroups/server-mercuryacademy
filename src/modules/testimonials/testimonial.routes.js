import express from "express";

import testimonialController from "./testimonial.controller.js";

import authenticate from "../../middleware/authenticate.middleware.js";
import validateRequest from "../../middleware/validate.middleware.js";

import {
  createTestimonialSchema,
  updateTestimonialSchema,
  testimonialIdSchema,
  testimonialQuerySchema,
} from "./testimonial.validation.js";

const router = express.Router();

/**
 * Create Testimonial
 */
router.post(
  "/",
  authenticate,
  validateRequest(createTestimonialSchema),
  testimonialController.createTestimonial,
);

/**
 * Get Testimonials
 */
router.get(
  "/",
  validateRequest(testimonialQuerySchema),
  testimonialController.getTestimonials,
);

/**
 * Get Testimonial By ID
 */
router.get(
  "/:id",
  validateRequest(testimonialIdSchema),
  testimonialController.getTestimonialById,
);

/**
 * Update Testimonial
 */
router.patch(
  "/:id",
  authenticate,
  validateRequest(updateTestimonialSchema),
  testimonialController.updateTestimonial,
);

/**
 * Delete Testimonial
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(testimonialIdSchema),
  testimonialController.deleteTestimonial,
);

export default router;
