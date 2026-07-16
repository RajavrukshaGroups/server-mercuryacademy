import Testimonial from "./testimonial.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";

/**
 * Normalize Testimonial Scope
 */
const normalizeScope = (payload) => {
  const normalizedPayload = {
    ...payload,
  };

  if (normalizedPayload.scope === "GLOBAL") {
    normalizedPayload.university = null;
    normalizedPayload.universityCourse = null;
  }

  if (normalizedPayload.scope === "UNIVERSITY") {
    if (!normalizedPayload.university) {
      throw new ApiError(400, "University is required.");
    }

    normalizedPayload.universityCourse = null;
  }

  if (normalizedPayload.scope === "UNIVERSITY_COURSE") {
    if (!normalizedPayload.universityCourse) {
      throw new ApiError(400, "University Course is required.");
    }

    normalizedPayload.university = null;
  }

  return normalizedPayload;
};

/**
 * Populate Configuration
 */
const testimonialPopulate = [
  {
    path: "university",
  },
  {
    path: "universityCourse",
    populate: [
      {
        path: "university",
      },
      {
        path: "courseCatalog",
      },
      {
        path: "specialization",
      },
    ],
  },
  {
    path: "photo",
  },
];

/**
 * Create Testimonial
 */
const createTestimonial = async (payload) => {
  const normalizedPayload = normalizeScope({
    ...payload,

    studentName: payload.studentName.trim(),

    designation: payload.designation?.trim() || "",

    review: payload.review.trim(),

    photo: payload.photo || null,
  });

  const testimonial = await Testimonial.create(normalizedPayload);

  return await Testimonial.findById(testimonial._id).populate(
    testimonialPopulate,
  );
};

/**
 * Get Testimonials
 */
const getTestimonials = async ({
  page = 1,
  limit = 10,
  search = "",
  scope,
  university,
  universityCourse,
  rating,
  status,
  featured,
  sortBy = "displayOrder",
  sortOrder = "asc",
}) => {
  const filter = {};

  /**
   * Search
   */
  if (search) {
    filter.$or = [
      {
        studentName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        designation: {
          $regex: search,
          $options: "i",
        },
      },
      {
        review: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  /**
   * Filters
   */
  if (scope) {
    filter.scope = scope;
  }

  if (university) {
    filter.university = university;
  }

  if (universityCourse) {
    filter.universityCourse = universityCourse;
  }

  if (rating !== undefined) {
    filter.rating = rating;
  }

  if (status) {
    filter.status = status;
  }

  if (featured !== undefined) {
    filter.featured = featured;
  }

  return await baseService.paginate(Testimonial, filter, {
    page,
    limit,
    sortBy,
    sortOrder,
    populate: testimonialPopulate,
  });
};

/**
 * Get Testimonial By ID
 */
const getTestimonialById = async (id) => {
  return await baseService.findById(Testimonial, id, testimonialPopulate);
};

/**
 * Update Testimonial
 */
const updateTestimonial = async (id, payload) => {
  const testimonial = await baseService.findById(Testimonial, id);

  /**
   * Merge old and new data before validating scope.
   */
  const mergedPayload = normalizeScope({
    ...testimonial.toObject(),
    ...payload,
  });

  if (payload.studentName !== undefined) {
    mergedPayload.studentName = payload.studentName.trim();
  }

  if (payload.designation !== undefined) {
    mergedPayload.designation = payload.designation?.trim() || "";
  }

  if (payload.review !== undefined) {
    mergedPayload.review = payload.review.trim();
  }

  if (payload.photo !== undefined) {
    mergedPayload.photo = payload.photo || null;
  }

  /**
   * Avoid assigning immutable/system fields.
   */
  const updatePayload = {
    scope: mergedPayload.scope,

    university: mergedPayload.university,

    universityCourse: mergedPayload.universityCourse,

    studentName: mergedPayload.studentName,

    designation: mergedPayload.designation,

    review: mergedPayload.review,

    rating: mergedPayload.rating,

    photo: mergedPayload.photo,

    featured: mergedPayload.featured,

    displayOrder: mergedPayload.displayOrder,

    status: mergedPayload.status,
  };

  Object.assign(testimonial, updatePayload);

  await testimonial.save();

  return await Testimonial.findById(testimonial._id).populate(
    testimonialPopulate,
  );
};

/**
 * Delete Testimonial
 */
const deleteTestimonial = async (id) => {
  await baseService.softDelete(Testimonial, id);

  return null;
};

const testimonialService = {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};

export default testimonialService;
