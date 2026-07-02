import slugify from "slugify";

import Specialization from "./specialization.model.js";
import CourseCatalog from "../course-catalog/course-catalog.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";

/**
 * Create Specialization
 */
const createSpecialization = async (payload) => {
  const normalizedPayload = {
    ...payload,
    name: payload.name.trim(),
    code: payload.code.trim().toUpperCase(),
  };

  normalizedPayload.slug = slugify(normalizedPayload.name, {
    lower: true,
    strict: true,
  });

  // Validate Course Catalog
  await baseService.findById(CourseCatalog, normalizedPayload.courseCatalog);

  const existingSpecialization = await Specialization.findOne({
    $or: [
      { name: normalizedPayload.name },
      { code: normalizedPayload.code },
      { slug: normalizedPayload.slug },
    ],
    isDeleted: false,
  });

  if (existingSpecialization?.name === normalizedPayload.name) {
    throw new ApiError(409, "Specialization name already exists.");
  }

  if (existingSpecialization?.code === normalizedPayload.code) {
    throw new ApiError(409, "Specialization code already exists.");
  }

  if (existingSpecialization?.slug === normalizedPayload.slug) {
    throw new ApiError(409, "Specialization slug already exists.");
  }

  return await Specialization.create(normalizedPayload);
};

/**
 * Get Specializations
 */
const getSpecializations = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  featured,
  courseCatalog,
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
        code: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (status) {
    filter.status = status;
  }

  if (featured !== undefined) {
    filter.featured = featured;
  }

  if (courseCatalog) {
    filter.courseCatalog = courseCatalog;
  }

  return await baseService.paginate(Specialization, filter, {
    page,
    limit,
    sortBy,
    sortOrder,
    populate: ["courseCatalog", "icon"],
  });
};

/**
 * Get Specialization By ID
 */
const getSpecializationById = async (id) => {
  return await baseService.findById(Specialization, id, [
    "courseCatalog",
    "icon",
  ]);
};

/**
 * Update Specialization
 */
const updateSpecialization = async (id, payload) => {
  const specialization = await baseService.findById(Specialization, id);

  const normalizedPayload = {
    ...payload,
  };

  if (payload.name) {
    normalizedPayload.name = payload.name.trim();

    normalizedPayload.slug = slugify(normalizedPayload.name, {
      lower: true,
      strict: true,
    });

    const existingName = await Specialization.findOne({
      name: normalizedPayload.name,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingName) {
      throw new ApiError(409, "Specialization name already exists.");
    }

    const existingSlug = await Specialization.findOne({
      slug: normalizedPayload.slug,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingSlug) {
      throw new ApiError(409, "Specialization slug already exists.");
    }
  }

  if (payload.code) {
    normalizedPayload.code = payload.code.trim().toUpperCase();

    const existingCode = await Specialization.findOne({
      code: normalizedPayload.code,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingCode) {
      throw new ApiError(409, "Specialization code already exists.");
    }
  }

  if (payload.courseCatalog) {
    await baseService.findById(CourseCatalog, payload.courseCatalog);
  }

  Object.assign(specialization, normalizedPayload);

  await specialization.save();

  return specialization;
};

/**
 * Delete Specialization
 */
const deleteSpecialization = async (id) => {
  await baseService.softDelete(Specialization, id);

  return null;
};

const specializationService = {
  createSpecialization,
  getSpecializations,
  getSpecializationById,
  updateSpecialization,
  deleteSpecialization,
};

export default specializationService;
