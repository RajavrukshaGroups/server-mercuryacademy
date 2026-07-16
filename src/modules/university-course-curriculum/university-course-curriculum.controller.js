import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import universityCourseCurriculumService from "./university-course-curriculum.service.js";

/**
 * Create Curriculum
 */
const createUniversityCourseCurriculum = asyncHandler(async (req, res) => {
  const curriculum =
    await universityCourseCurriculumService.createUniversityCourseCurriculum(
      req.body,
    );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "University course curriculum created successfully.",
        curriculum,
      ),
    );
});

/**
 * Get All Curriculums
 */
const getUniversityCourseCurriculums = asyncHandler(async (req, res) => {
  const result =
    await universityCourseCurriculumService.getUniversityCourseCurriculums(
      req.query,
    );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "University course curriculums fetched successfully.",
        result.data,
        result.meta,
      ),
    );
});

/**
 * Get Curriculum By ID
 */
const getUniversityCourseCurriculumById = asyncHandler(async (req, res) => {
  const curriculum =
    await universityCourseCurriculumService.getUniversityCourseCurriculumById(
      req.params.id,
    );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "University course curriculum fetched successfully.",
        curriculum,
      ),
    );
});

/**
 * Update Curriculum
 */
const updateUniversityCourseCurriculum = asyncHandler(async (req, res) => {
  const curriculum =
    await universityCourseCurriculumService.updateUniversityCourseCurriculum(
      req.params.id,
      req.body,
    );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "University course curriculum updated successfully.",
        curriculum,
      ),
    );
});

/**
 * Delete Curriculum
 */
const deleteUniversityCourseCurriculum = asyncHandler(async (req, res) => {
  await universityCourseCurriculumService.deleteUniversityCourseCurriculum(
    req.params.id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "University course curriculum deleted successfully.",
      ),
    );
});

const universityCourseCurriculumController = {
  createUniversityCourseCurriculum,
  getUniversityCourseCurriculums,
  getUniversityCourseCurriculumById,
  updateUniversityCourseCurriculum,
  deleteUniversityCourseCurriculum,
};

export default universityCourseCurriculumController;
