import UniversityCourseCurriculum from "./university-course-curriculum.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";

/**
 * Create Curriculum
 */
const createUniversityCourseCurriculum = async (payload) => {
  const normalizedPayload = {
    ...payload,
    title: payload.title.trim(),
  };

  /**
   * Prevent duplicate semester
   */
  const existingCurriculum = await UniversityCourseCurriculum.findOne({
    universityCourse: normalizedPayload.universityCourse,
    semesterNumber: normalizedPayload.semesterNumber,
    isDeleted: false,
  });

  if (existingCurriculum) {
    throw new ApiError(
      409,
      "Semester already exists for this university course.",
    );
  }

  const curriculum = await UniversityCourseCurriculum.create(normalizedPayload);

  return curriculum;
};

/**
 * Get All Curriculums
 */
const getUniversityCourseCurriculums = async ({
  page = 1,
  limit = 10,
  search = "",
  universityCourse,
  status,
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
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  /**
   * Filter by University Course
   */
  if (universityCourse) {
    filter.universityCourse = universityCourse;
  }

  /**
   * Status
   */
  if (status) {
    filter.status = status;
  }

  return await baseService.paginate(UniversityCourseCurriculum, filter, {
    page,
    limit,
    sortBy,
    sortOrder,

    populate: [
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
    ],
  });
};

/**
 * Get Curriculum By ID
 */
const getUniversityCourseCurriculumById = async (id) => {
  return await baseService.findById(UniversityCourseCurriculum, id, [
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
  ]);
};

/**
 * Update Curriculum
 */
const updateUniversityCourseCurriculum = async (id, payload) => {
  const curriculum = await baseService.findById(UniversityCourseCurriculum, id);

  const normalizedPayload = {
    ...payload,
  };

  if (payload.title) {
    normalizedPayload.title = payload.title.trim();
  }

  /**
   * Duplicate Semester Check
   */
  if (payload.universityCourse || payload.semesterNumber) {
    const existingCurriculum = await UniversityCourseCurriculum.findOne({
      universityCourse: payload.universityCourse || curriculum.universityCourse,

      semesterNumber: payload.semesterNumber || curriculum.semesterNumber,

      _id: {
        $ne: id,
      },

      isDeleted: false,
    });

    if (existingCurriculum) {
      throw new ApiError(
        409,
        "Semester already exists for this university course.",
      );
    }
  }

  Object.assign(curriculum, normalizedPayload);

  await curriculum.save();

  return curriculum;
};

/**
 * Delete Curriculum
 */
const deleteUniversityCourseCurriculum = async (id) => {
  await baseService.softDelete(UniversityCourseCurriculum, id);

  return null;
};

const universityCourseCurriculumService = {
  createUniversityCourseCurriculum,

  getUniversityCourseCurriculums,

  getUniversityCourseCurriculumById,

  updateUniversityCourseCurriculum,

  deleteUniversityCourseCurriculum,
};

export default universityCourseCurriculumService;
