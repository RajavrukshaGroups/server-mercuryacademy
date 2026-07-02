import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import specializationService from "./specialization.service.js";

/**
 * Create Specialization
 */
const createSpecialization = asyncHandler(async (req, res) => {
  const specialization = await specializationService.createSpecialization(
    req.body,
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Specialization created successfully.",
        specialization,
      ),
    );
});

/**
 * Get Specializations
 */
const getSpecializations = asyncHandler(async (req, res) => {
  const result = await specializationService.getSpecializations(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Specializations fetched successfully.",
        result.data,
        result.meta,
      ),
    );
});

/**
 * Get Specialization By ID
 */
const getSpecializationById = asyncHandler(async (req, res) => {
  const specialization = await specializationService.getSpecializationById(
    req.params.id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Specialization fetched successfully.",
        specialization,
      ),
    );
});

/**
 * Update Specialization
 */
const updateSpecialization = asyncHandler(async (req, res) => {
  const specialization = await specializationService.updateSpecialization(
    req.params.id,
    req.body,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Specialization updated successfully.",
        specialization,
      ),
    );
});

/**
 * Delete Specialization
 */
const deleteSpecialization = asyncHandler(async (req, res) => {
  await specializationService.deleteSpecialization(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Specialization deleted successfully."));
});

const specializationController = {
  createSpecialization,
  getSpecializations,
  getSpecializationById,
  updateSpecialization,
  deleteSpecialization,
};

export default specializationController;
