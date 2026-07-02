import slugify from "slugify";

import CourseCategory from "./course-category.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";

const createCourseCategory = async (payload) => {
  const normalizedPayload = {
    ...payload,
    name: payload.name.trim(),
    code: payload.code.trim().toUpperCase(),
  };

  normalizedPayload.slug = slugify(normalizedPayload.name, {
    lower: true,
    strict: true,
  });

  const existingCategory = await CourseCategory.findOne({
    $or: [
      { name: normalizedPayload.name },
      { code: normalizedPayload.code },
      { slug: normalizedPayload.slug },
    ],
    isDeleted: false,
  });

  if (existingCategory?.name === normalizedPayload.name) {
    throw new ApiError(409, "Course category name already exists.");
  }

  if (existingCategory?.code === normalizedPayload.code) {
    throw new ApiError(409, "Course category code already exists.");
  }

  if (existingCategory?.slug === normalizedPayload.slug) {
    throw new ApiError(409, "Course category slug already exists.");
  }

  const category = await CourseCategory.create(normalizedPayload);

  return category;
};

const getCourseCategories = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  sortBy = "displayOrder",
  sortOrder = "asc",
}) => {
  const filter = {};

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (status) {
    filter.status = status;
  }

  return await baseService.paginate(CourseCategory, filter, {
    page,
    limit,
    sortBy,
    sortOrder,
  });
};

const getCourseCategoryById = async (id) => {
  return await baseService.findById(CourseCategory, id);
};

const updateCourseCategory = async (id, payload) => {
  const category = await baseService.findById(CourseCategory, id);

  const normalizedPayload = {
    ...payload,
  };

  if (payload.name) {
    normalizedPayload.name = payload.name.trim();

    normalizedPayload.slug = slugify(normalizedPayload.name, {
      lower: true,
      strict: true,
    });

    const existingName = await CourseCategory.findOne({
      _id: { $ne: id },
      name: normalizedPayload.name,
      isDeleted: false,
    });

    if (existingName) {
      throw new ApiError(409, "Course category name already exists.");
    }
  }

  if (payload.code) {
    normalizedPayload.code = payload.code.trim().toUpperCase();

    const existingCode = await CourseCategory.findOne({
      _id: { $ne: id },
      code: normalizedPayload.code,
      isDeleted: false,
    });

    if (existingCode) {
      throw new ApiError(409, "Course category code already exists.");
    }
  }

  Object.assign(category, normalizedPayload);

  await category.save();

  return category;
};

const deleteCourseCategory = async (id) => {
  await baseService.softDelete(CourseCategory, id);

  return null;
};

const courseCategoryService = {
  createCourseCategory,
  getCourseCategories,
  getCourseCategoryById,
  updateCourseCategory,
  deleteCourseCategory,
};

export default courseCategoryService;
