import slugify from "slugify";

import CourseCatalog from "./course-catalog.model.js";
import CourseCategory from "../course-category/course-category.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";
import validateReferences from "../../helpers/reference.helpers.js";

/**
 * Create Course Catalog
 */
const createCourseCatalog = async (payload) => {
  const normalizedPayload = {
    ...payload,
    name: payload.name.trim(),
    shortName: payload.shortName.trim().toUpperCase(),
    code: payload.code.trim().toUpperCase(),
  };

  normalizedPayload.slug = slugify(normalizedPayload.name, {
    lower: true,
    strict: true,
  });

  // Validate Category
  // await baseService.findById(CourseCategory, normalizedPayload.category);
  await validateReferences([
    {
      Model: CourseCategory,
      id: normalizedPayload.category,
    },
  ]);

  // Check Duplicate
  const existingCourse = await CourseCatalog.findOne({
    $or: [
      { name: normalizedPayload.name },
      { shortName: normalizedPayload.shortName },
      { code: normalizedPayload.code },
      { slug: normalizedPayload.slug },
    ],
    isDeleted: false,
  });

  if (existingCourse?.name === normalizedPayload.name) {
    throw new ApiError(409, "Course name already exists.");
  }

  if (existingCourse?.shortName === normalizedPayload.shortName) {
    throw new ApiError(409, "Course short name already exists.");
  }

  if (existingCourse?.code === normalizedPayload.code) {
    throw new ApiError(409, "Course code already exists.");
  }

  if (existingCourse?.slug === normalizedPayload.slug) {
    throw new ApiError(409, "Course slug already exists.");
  }

  const courseCatalog = await CourseCatalog.create(normalizedPayload);

  return courseCatalog;
};

/**
 * Get All Course Catalogs
 */
const getCourseCatalogs = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  category,
  level,
  degreeType,
  sortBy = "displayOrder",
  sortOrder = "asc",
}) => {
  const filter = {};

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        shortName: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (status) {
    filter.status = status;
  }

  if (category) {
    filter.category = category;
  }

  if (level) {
    filter.level = level;
  }

  if (degreeType) {
    filter.degreeType = degreeType;
  }

  return await baseService.paginate(CourseCatalog, filter, {
    page,
    limit,
    sortBy,
    sortOrder,
    populate: ["category"],
  });
};

/**
 * Get Course Catalog By ID
 */
const getCourseCatalogById = async (id) => {
  return await baseService.findById(CourseCatalog, id, ["category"]);
};

/**
 * Update Course Catalog
 */
const updateCourseCatalog = async (id, payload) => {
  const courseCatalog = await baseService.findById(CourseCatalog, id);

  const normalizedPayload = {
    ...payload,
  };

  // Update Name
  if (payload.name) {
    normalizedPayload.name = payload.name.trim();

    normalizedPayload.slug = slugify(normalizedPayload.name, {
      lower: true,
      strict: true,
    });

    const existingName = await CourseCatalog.findOne({
      name: normalizedPayload.name,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingName) {
      throw new ApiError(409, "Course name already exists.");
    }

    const existingSlug = await CourseCatalog.findOne({
      slug: normalizedPayload.slug,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingSlug) {
      throw new ApiError(409, "Course slug already exists.");
    }
  }

  // Update Short Name
  if (payload.shortName) {
    normalizedPayload.shortName = payload.shortName.trim().toUpperCase();

    const existingShortName = await CourseCatalog.findOne({
      shortName: normalizedPayload.shortName,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingShortName) {
      throw new ApiError(409, "Course short name already exists.");
    }
  }

  // Update Code
  if (payload.code) {
    normalizedPayload.code = payload.code.trim().toUpperCase();

    const existingCode = await CourseCatalog.findOne({
      code: normalizedPayload.code,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingCode) {
      throw new ApiError(409, "Course code already exists.");
    }
  }

  // Validate Category
  if (payload.category) {
    await baseService.findById(CourseCategory, payload.category);
  }

  Object.assign(courseCatalog, normalizedPayload);

  await courseCatalog.save();

  return courseCatalog;
};

/**
 * Delete Course Catalog
 */
const deleteCourseCatalog = async (id) => {
  await baseService.softDelete(CourseCatalog, id);

  return null;
};

const courseCatalogService = {
  createCourseCatalog,
  getCourseCatalogs,
  getCourseCatalogById,
  updateCourseCatalog,
  deleteCourseCatalog,
};

export default courseCatalogService;
