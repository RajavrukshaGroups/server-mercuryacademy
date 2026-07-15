import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import settingsService from "./settings.service.js";

/**
 * Get Settings
 */
const getSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.getSettings();

  return res
    .status(200)
    .json(new ApiResponse(200, "Settings fetched successfully.", settings));
});

/**
 * Update Settings
 */
const updateSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.updateSettings(req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "Settings updated successfully.", settings));
});

const settingsController = {
  getSettings,
  updateSettings,
};

export default settingsController;
