import UniversityCourse from "./university-course.model.js";

import University from "../university/university.model.js";
import CourseCatalog from "../course-catalog/course-catalog.model.js";
import Specialization from "../specialization/specialization.model.js";
import Media from "../media/media.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";
import validateReferences from "../../helpers/reference.helpers.js";

/**
 * Create University Course
 */
const createUniversityCourse = async (payload) => {
  const normalizedPayload = {
    ...payload,
  };

  /**
   * Validate References
   */
  await validateReferences([
    {
      Model: University,
      id: normalizedPayload.university,
    },
    {
      Model: CourseCatalog,
      id: normalizedPayload.courseCatalog,
    },
    {
      Model: Specialization,
      id: normalizedPayload.specialization,
    },
    {
      Model: Media,
      id: normalizedPayload.brochure,
    },
    {
      Model: Media,
      id: normalizedPayload.thumbnail,
    },
    {
      Model: Media,
      id: normalizedPayload.banner,
    },
  ]);

  /**
   * Duplicate Check
   */
  const existingUniversityCourse = await UniversityCourse.findOne({
    university: normalizedPayload.university,
    courseCatalog: normalizedPayload.courseCatalog,
    specialization: normalizedPayload.specialization || null,
    isDeleted: false,
  });

  if (existingUniversityCourse) {
    throw new ApiError(409, "This university course already exists.");
  }

  return await UniversityCourse.create(normalizedPayload);
};

/**
 * Get University Courses
 */
const getUniversityCourses = async ({
  page = 1,
  limit = 10,
  search = "",
  university,
  courseCatalog,
  specialization,
  studyMode,
  admissionMode,
  status,
  featured,
  sortBy = "displayOrder",
  sortOrder = "asc",
}) => {
  const filter = {};

  // if (search) {
  //   filter.$or = [
  //     {
  //       eligibility: {
  //         $regex: search,
  //         $options: "i",
  //       },
  //     },
  //     {
  //       overview: {
  //         $regex: search,
  //         $options: "i",
  //       },
  //     },
  //     {
  //       degreeAwarded: {
  //         $regex: search,
  //         $options: "i",
  //       },
  //     },
  //   ];
  // }

  if (search) {
    const regex = new RegExp(search, "i");

    const [matchedUniversities, matchedCourseCatalogs, matchedSpecializations] =
      await Promise.all([
        University.find({ name: regex }).select("_id"),
        CourseCatalog.find({ name: regex }).select("_id"),
        Specialization.find({ name: regex }).select("_id"),
      ]);

    filter.$or = [
      {
        eligibility: {
          $regex: regex,
        },
      },
      {
        overview: {
          $regex: regex,
        },
      },
      {
        degreeAwarded: {
          $regex: regex,
        },
      },
      {
        studyMode: {
          $regex: regex,
        },
      },
      {
        admissionMode: {
          $regex: regex,
        },
      },
      {
        university: {
          $in: matchedUniversities.map((item) => item._id),
        },
      },
      {
        courseCatalog: {
          $in: matchedCourseCatalogs.map((item) => item._id),
        },
      },
      {
        specialization: {
          $in: matchedSpecializations.map((item) => item._id),
        },
      },
    ];
  }

  if (university) {
    filter.university = university;
  }

  if (courseCatalog) {
    filter.courseCatalog = courseCatalog;
  }

  if (specialization) {
    filter.specialization = specialization;
  }

  if (studyMode) {
    filter.studyMode = studyMode;
  }

  if (admissionMode) {
    filter.admissionMode = admissionMode;
  }

  if (status) {
    filter.status = status;
  }

  if (featured !== undefined) {
    filter.featured = featured;
  }

  return await baseService.paginate(UniversityCourse, filter, {
    page,
    limit,
    sortBy,
    sortOrder,
    populate: [
      "university",
      "courseCatalog",
      "specialization",
      "brochure",
      "thumbnail",
      "banner",
    ],
  });
};

/**
 * Get University Course By ID
 */
const getUniversityCourseById = async (id) => {
  return await baseService.findById(UniversityCourse, id, [
    "university",
    "courseCatalog",
    "specialization",
    "brochure",
    "thumbnail",
    "banner",
  ]);
};

/**
 * Update University Course
 */
const updateUniversityCourse = async (id, payload) => {
  const universityCourse = await baseService.findById(UniversityCourse, id);

  const normalizedPayload = {
    ...payload,
  };

  /**
   * Validate References
   */
  await validateReferences([
    {
      Model: University,
      id: normalizedPayload.university,
    },
    {
      Model: CourseCatalog,
      id: normalizedPayload.courseCatalog,
    },
    {
      Model: Specialization,
      id: normalizedPayload.specialization,
    },
    {
      Model: Media,
      id: normalizedPayload.brochure,
    },
    {
      Model: Media,
      id: normalizedPayload.thumbnail,
    },
    {
      Model: Media,
      id: normalizedPayload.banner,
    },
  ]);

  /**
   * Duplicate Check
   */
  const existingUniversityCourse = await UniversityCourse.findOne({
    university: normalizedPayload.university || universityCourse.university,
    courseCatalog:
      normalizedPayload.courseCatalog || universityCourse.courseCatalog,
    specialization:
      normalizedPayload.specialization ?? universityCourse.specialization,
    _id: {
      $ne: id,
    },
    isDeleted: false,
  });

  if (existingUniversityCourse) {
    throw new ApiError(409, "This university course already exists.");
  }

  Object.assign(universityCourse, normalizedPayload);

  await universityCourse.save();

  return universityCourse;
};

/**
 * Delete University Course
 */
const deleteUniversityCourse = async (id) => {
  await baseService.softDelete(UniversityCourse, id);

  return null;
};

const universityCourseService = {
  createUniversityCourse,
  getUniversityCourses,
  getUniversityCourseById,
  updateUniversityCourse,
  deleteUniversityCourse,
};

export default universityCourseService;
