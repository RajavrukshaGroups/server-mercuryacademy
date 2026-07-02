import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import courseCatalogService from "./course-catalog.service.js";

/**
 * Create Course Catalog
 */
const createCourseCatalog = asyncHandler(async (req, res) => {
  const courseCatalog = await courseCatalogService.createCourseCatalog(
    req.body,
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Course catalog created successfully.",
        courseCatalog,
      ),
    );
});

/**
 * Get All Course Catalogs
 */
const getCourseCatalogs = asyncHandler(async (req, res) => {
  const result = await courseCatalogService.getCourseCatalogs(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Course catalogs fetched successfully.",
        result.data,
        result.meta,
      ),
    );
});

/**
 * Get Course Catalog By ID
 */
const getCourseCatalogById = asyncHandler(async (req, res) => {
  const courseCatalog = await courseCatalogService.getCourseCatalogById(
    req.params.id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Course catalog fetched successfully.",
        courseCatalog,
      ),
    );
});

/**
 * Update Course Catalog
 */
const updateCourseCatalog = asyncHandler(async (req, res) => {
  const courseCatalog = await courseCatalogService.updateCourseCatalog(
    req.params.id,
    req.body,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Course catalog updated successfully.",
        courseCatalog,
      ),
    );
});

/**
 * Delete Course Catalog
 */
const deleteCourseCatalog = asyncHandler(async (req, res) => {
  await courseCatalogService.deleteCourseCatalog(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Course catalog deleted successfully."));
});

const courseCatalogController = {
  createCourseCatalog,
  getCourseCatalogs,
  getCourseCatalogById,
  updateCourseCatalog,
  deleteCourseCatalog,
};

export default courseCatalogController;
