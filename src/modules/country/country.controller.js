import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import countryService from "./country.service.js";

/**
 * Create Country
 */
const createCountry = asyncHandler(async (req, res) => {
  const country = await countryService.createCountry(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "Country created successfully.", country));
});

/**
 * Get All Countries
 */
const getCountries = asyncHandler(async (req, res) => {
  const result = await countryService.getCountries(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Countries fetched successfully.",
        result.data,
        result.meta,
      ),
    );
});

/**
 * Get Country By ID
 */
const getCountryById = asyncHandler(async (req, res) => {
  const country = await countryService.getCountryById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Country fetched successfully.", country));
});

/**
 * Update Country
 */
const updateCountry = asyncHandler(async (req, res) => {
  const country = await countryService.updateCountry(req.params.id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "Country updated successfully.", country));
});

/**
 * Delete Country
 */
const deleteCountry = asyncHandler(async (req, res) => {
  await countryService.deleteCountry(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Country deleted successfully."));
});

const countryController = {
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
};

export default countryController;
