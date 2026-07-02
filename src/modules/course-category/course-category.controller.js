import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import courseCategoryService from "./course-category.service.js";

/**
 * Create Course Category
 */
const createCourseCategory = asyncHandler(async (req, res) => {
  const category = await courseCategoryService.createCourseCategory(req.body);

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Course category created successfully.", category),
    );
});

/**
 * Get All Course Categories
 */
const getCourseCategories = asyncHandler(async (req, res) => {
  const result = await courseCategoryService.getCourseCategories(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Course categories fetched successfully.",
        result.data,
        result.meta,
      ),
    );
});

/**
 * Get Course Category By ID
 */
const getCourseCategoryById = asyncHandler(async (req, res) => {
  const category = await courseCategoryService.getCourseCategoryById(
    req.params.id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Course category fetched successfully.", category),
    );
});

/**
 * Update Course Category
 */
const updateCourseCategory = asyncHandler(async (req, res) => {
  const category = await courseCategoryService.updateCourseCategory(
    req.params.id,
    req.body,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Course category updated successfully.", category),
    );
});

/**
 * Delete Course Category
 */
const deleteCourseCategory = asyncHandler(async (req, res) => {
  await courseCategoryService.deleteCourseCategory(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Course category deleted successfully."));
});

const courseCategoryController = {
  createCourseCategory,
  getCourseCategories,
  getCourseCategoryById,
  updateCourseCategory,
  deleteCourseCategory,
};

export default courseCategoryController;
