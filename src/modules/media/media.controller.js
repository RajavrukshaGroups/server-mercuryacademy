import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import mediaService from "./media.service.js";

/**
 * Upload Media
 */
const uploadMedia = asyncHandler(async (req, res) => {
  const media = await mediaService.uploadMedia(req.file, req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "Media uploaded successfully.", media));
});

/**
 * Get Media
 */
const getMedia = asyncHandler(async (req, res) => {
  const result = await mediaService.getMedia(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Media fetched successfully.",
        result.data,
        result.meta,
      ),
    );
});

/**
 * Get Media By ID
 */
const getMediaById = asyncHandler(async (req, res) => {
  const media = await mediaService.getMediaById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Media fetched successfully.", media));
});

/**
 * Update Media
 */
const updateMedia = asyncHandler(async (req, res) => {
  const media = await mediaService.updateMedia(req.params.id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "Media updated successfully.", media));
});

/**
 * Delete Media
 */
const deleteMedia = asyncHandler(async (req, res) => {
  await mediaService.deleteMedia(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Media deleted successfully."));
});

const mediaController = {
  uploadMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};

export default mediaController;
