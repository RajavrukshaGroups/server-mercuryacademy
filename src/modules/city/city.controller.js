import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import cityService from "./city.service.js";

/**
 * Create City
 */
const createCity = asyncHandler(async (req, res) => {
  const city = await cityService.createCity(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "City created successfully.", city));
});

/**
 * Get All Cities
 */
const getCities = asyncHandler(async (req, res) => {
  const result = await cityService.getCities(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Cities fetched successfully.",
        result.data,
        result.meta,
      ),
    );
});

/**
 * Get City By ID
 */
const getCityById = asyncHandler(async (req, res) => {
  const city = await cityService.getCityById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "City fetched successfully.", city));
});

/**
 * Update City
 */
const updateCity = asyncHandler(async (req, res) => {
  const city = await cityService.updateCity(req.params.id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "City updated successfully.", city));
});

/**
 * Delete City
 */
const deleteCity = asyncHandler(async (req, res) => {
  await cityService.deleteCity(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "City deleted successfully."));
});

const cityController = {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
};

export default cityController;
