import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  getPublicUniversityBySlug,
  getPublicUniversityCourseBySlug,
} from "./public.service.js";

/**
 * GET /api/v1/public/universities/:slug
 */
export const getPublicUniversity = asyncHandler(async (req, res) => {
  const university = await getPublicUniversityBySlug(req.params.slug);

  if (!university) {
    throw new ApiError(404, "Published university not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "University details fetched successfully.",
        university,
      ),
    );
});

/**
 * GET /api/v1/public/universities/:universitySlug/courses/:courseSlug
 */
export const getPublicUniversityCourse = asyncHandler(async (req, res) => {
  const { universitySlug, courseSlug } = req.params;

  const result = await getPublicUniversityCourseBySlug(
    universitySlug,
    courseSlug,
  );

  if (!result) {
    throw new ApiError(404, "Published university course not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "University course details fetched successfully.",
        result,
      ),
    );
});
