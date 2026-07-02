import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import stateService from "./state.service.js";

/**
 * Create State
 */
const createState = asyncHandler(async (req, res) => {
  const state = await stateService.createState(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "State created successfully.", state));
});

/**
 * Get All States
 */
const getStates = asyncHandler(async (req, res) => {
  const result = await stateService.getStates(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "States fetched successfully.",
        result.data,
        result.meta,
      ),
    );
});

/**
 * Get State By ID
 */
const getStateById = asyncHandler(async (req, res) => {
  const state = await stateService.getStateById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "State fetched successfully.", state));
});

/**
 * Update State
 */
const updateState = asyncHandler(async (req, res) => {
  const state = await stateService.updateState(req.params.id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "State updated successfully.", state));
});

/**
 * Delete State
 */
const deleteState = asyncHandler(async (req, res) => {
  await stateService.deleteState(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "State deleted successfully."));
});

const stateController = {
  createState,
  getStates,
  getStateById,
  updateState,
  deleteState,
};

export default stateController;
