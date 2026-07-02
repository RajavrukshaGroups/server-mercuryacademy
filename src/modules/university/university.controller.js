import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import universityService from "./university.service.js";

/**
 * Create University
 */
const createUniversity = asyncHandler(async (req, res) => {
  const university = await universityService.createUniversity(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "University created successfully.", university));
});

/**
 * Get All Universities
 */
const getUniversities = asyncHandler(async (req, res) => {
  const result = await universityService.getUniversities(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Universities fetched successfully.",
        result.data,
        result.meta,
      ),
    );
});

/**
 * Get University By ID
 */
const getUniversityById = asyncHandler(async (req, res) => {
  const university = await universityService.getUniversityById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "University fetched successfully.", university));
});

/**
 * Update University
 */
const updateUniversity = asyncHandler(async (req, res) => {
  const university = await universityService.updateUniversity(
    req.params.id,
    req.body,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "University updated successfully.", university));
});

/**
 * Delete University
 */
const deleteUniversity = asyncHandler(async (req, res) => {
  await universityService.deleteUniversity(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "University deleted successfully."));
});

const universityController = {
  createUniversity,
  getUniversities,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
};

export default universityController;
