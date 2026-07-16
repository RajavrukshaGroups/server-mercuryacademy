import asyncHandler from "../../utils/asyncHandler.js";

import faqService from "./faq.service.js";

/**
 * Create
 */
const createFaq = asyncHandler(async (req, res) => {
  const data = await faqService.createFaq(req.body);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "FAQ created successfully.",
    data,
  });
});

/**
 * List
 */
const getFaqs = asyncHandler(async (req, res) => {
  const result = await faqService.getFaqs(req.query);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "FAQs fetched successfully.",
    ...result,
  });
});

/**
 * Details
 */
const getFaqById = asyncHandler(async (req, res) => {
  const data = await faqService.getFaqById(req.params.id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "FAQ fetched successfully.",
    data,
  });
});

/**
 * Update
 */
const updateFaq = asyncHandler(async (req, res) => {
  const data = await faqService.updateFaq(req.params.id, req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "FAQ updated successfully.",
    data,
  });
});

/**
 * Delete
 */
const deleteFaq = asyncHandler(async (req, res) => {
  await faqService.deleteFaq(req.params.id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "FAQ deleted successfully.",
  });
});

const faqController = {
  createFaq,
  getFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
};

export default faqController;
