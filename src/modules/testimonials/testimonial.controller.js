import asyncHandler from "../../utils/asyncHandler.js";

import testimonialService from "./testimonial.service.js";

/**
 * Create Testimonial
 */
const createTestimonial = asyncHandler(async (req, res) => {
  const data = await testimonialService.createTestimonial(req.body);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Testimonial created successfully.",
    data,
  });
});

/**
 * Get Testimonials
 */
const getTestimonials = asyncHandler(async (req, res) => {
  const result = await testimonialService.getTestimonials(req.query);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Testimonials fetched successfully.",
    ...result,
  });
});

/**
 * Get Testimonial By ID
 */
const getTestimonialById = asyncHandler(async (req, res) => {
  const data = await testimonialService.getTestimonialById(req.params.id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Testimonial fetched successfully.",
    data,
  });
});

/**
 * Update Testimonial
 */
const updateTestimonial = asyncHandler(async (req, res) => {
  const data = await testimonialService.updateTestimonial(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Testimonial updated successfully.",
    data,
  });
});

/**
 * Delete Testimonial
 */
const deleteTestimonial = asyncHandler(async (req, res) => {
  await testimonialService.deleteTestimonial(req.params.id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Testimonial deleted successfully.",
  });
});

const testimonialController = {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};

export default testimonialController;
