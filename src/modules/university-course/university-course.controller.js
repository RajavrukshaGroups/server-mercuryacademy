import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import universityCourseService from "./university-course.service.js";

/**
 * Create University Course
 */
const createUniversityCourse = asyncHandler(async (req, res) => {
  const universityCourse = await universityCourseService.createUniversityCourse(
    req.body,
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "University course created successfully.",
        universityCourse,
      ),
    );
});

/**
 * Get University Courses
 */
const getUniversityCourses = asyncHandler(async (req, res) => {
  const result = await universityCourseService.getUniversityCourses(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "University courses fetched successfully.",
        result.data,
        result.meta,
      ),
    );
});

/**
 * Get University Course By ID
 */
const getUniversityCourseById = asyncHandler(async (req, res) => {
  const universityCourse =
    await universityCourseService.getUniversityCourseById(req.params.id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "University course fetched successfully.",
        universityCourse,
      ),
    );
});

/**
 * Update University Course
 */
const updateUniversityCourse = asyncHandler(async (req, res) => {
  const universityCourse = await universityCourseService.updateUniversityCourse(
    req.params.id,
    req.body,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "University course updated successfully.",
        universityCourse,
      ),
    );
});

/**
 * Delete University Course
 */
const deleteUniversityCourse = asyncHandler(async (req, res) => {
  await universityCourseService.deleteUniversityCourse(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "University course deleted successfully."));
});

const universityCourseController = {
  createUniversityCourse,
  getUniversityCourses,
  getUniversityCourseById,
  updateUniversityCourse,
  deleteUniversityCourse,
};

export default universityCourseController;
