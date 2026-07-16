import mongoose from "mongoose";

import baseFields from "../../schemas/base.schema.js";

const universityCourseCurriculumSchema = new mongoose.Schema(
  {
    /**
     * Parent University Course
     */
    universityCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UniversityCourse",
      required: true,
    },

    /**
     * Semester Number
     * Example:
     * 1
     * 2
     * 3
     */
    semesterNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    /**
     * Semester Name
     * Example:
     * Semester 1
     * Semester 2
     */
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    /**
     * Optional Description
     */
    description: {
      type: String,
      trim: true,
      default: "",
    },

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

/**
 * Prevent duplicate semester for same course
 *
 * MBA Finance
 * Semester 1
 *
 * should exist only once.
 */
universityCourseCurriculumSchema.index(
  {
    universityCourse: 1,
    semesterNumber: 1,
  },
  {
    unique: true,
  },
);

/**
 * Faster filtering
 */
universityCourseCurriculumSchema.index({
  universityCourse: 1,
});

universityCourseCurriculumSchema.index({
  semesterNumber: 1,
});

const UniversityCourseCurriculum = mongoose.model(
  "UniversityCourseCurriculum",
  universityCourseCurriculumSchema,
);

export default UniversityCourseCurriculum;
