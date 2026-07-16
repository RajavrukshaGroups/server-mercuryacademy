import UniversityCourseSubject from "./university-course-subject.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";

/**
 * Create
 */
const createUniversityCourseSubject = async (payload) => {
  const normalizedPayload = {
    ...payload,
    name: payload.name.trim(),
  };

  const existingSubject = await UniversityCourseSubject.findOne({
    universityCourseCurriculum: normalizedPayload.universityCourseCurriculum,
    name: normalizedPayload.name,
    isDeleted: false,
  });

  if (existingSubject) {
    throw new ApiError(409, "Subject already exists for this curriculum.");
  }

  return await UniversityCourseSubject.create(normalizedPayload);
};

/**
 * List
 */
const getUniversityCourseSubjects = async ({
  page = 1,
  limit = 10,
  search = "",
  universityCourseCurriculum,
  status,
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

  if (universityCourseCurriculum) {
    filter.universityCourseCurriculum = universityCourseCurriculum;
  }

  if (status) {
    filter.status = status;
  }

  return await baseService.paginate(UniversityCourseSubject, filter, {
    page,
    limit,
    sortBy,
    sortOrder,

    populate: [
      {
        path: "universityCourseCurriculum",
        populate: {
          path: "universityCourse",
          populate: [
            { path: "university" },
            { path: "courseCatalog" },
            { path: "specialization" },
          ],
        },
      },
    ],
  });
};

/**
 * Details
 */
const getUniversityCourseSubjectById = async (id) => {
  return await baseService.findById(UniversityCourseSubject, id, [
    {
      path: "universityCourseCurriculum",
      populate: {
        path: "universityCourse",
        populate: [
          { path: "university" },
          { path: "courseCatalog" },
          { path: "specialization" },
        ],
      },
    },
  ]);
};

/**
 * Update
 */
const updateUniversityCourseSubject = async (id, payload) => {
  const subject = await baseService.findById(UniversityCourseSubject, id);

  const normalizedPayload = {
    ...payload,
  };

  if (payload.name) {
    normalizedPayload.name = payload.name.trim();
  }

  if (payload.universityCourseCurriculum || payload.name) {
    const existing = await UniversityCourseSubject.findOne({
      universityCourseCurriculum:
        payload.universityCourseCurriculum ||
        subject.universityCourseCurriculum,

      name: payload.name || subject.name,

      _id: {
        $ne: id,
      },

      isDeleted: false,
    });

    if (existing) {
      throw new ApiError(409, "Subject already exists for this curriculum.");
    }
  }

  Object.assign(subject, normalizedPayload);

  await subject.save();

  return subject;
};

/**
 * Delete
 */
const deleteUniversityCourseSubject = async (id) => {
  await baseService.softDelete(UniversityCourseSubject, id);

  return null;
};

const universityCourseSubjectService = {
  createUniversityCourseSubject,

  getUniversityCourseSubjects,

  getUniversityCourseSubjectById,

  updateUniversityCourseSubject,

  deleteUniversityCourseSubject,
};

export default universityCourseSubjectService;
