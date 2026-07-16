import mongoose from "mongoose";

import baseFields from "../../schemas/base.schema.js";

const universityCourseSubjectSchema = new mongoose.Schema(
  {
    /**
     * Parent Semester
     */
    universityCourseCurriculum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UniversityCourseCurriculum",
      required: true,
    },

    /**
     * Subject Name
     */
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    /**
     * Subject Code
     */
    code: {
      type: String,
      trim: true,
      maxlength: 30,
      default: "",
    },

    /**
     * Credits
     */
    credits: {
      type: Number,
      default: 0,
      min: 0,
    },

    /**
     * Description
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
 * Same semester cannot have duplicate subject
 */
universityCourseSubjectSchema.index(
  {
    universityCourseCurriculum: 1,
    name: 1,
  },
  {
    unique: true,
  },
);

/**
 * Indexes
 */
universityCourseSubjectSchema.index({
  universityCourseCurriculum: 1,
});

universityCourseSubjectSchema.index({
  name: 1,
});

const UniversityCourseSubject = mongoose.model(
  "UniversityCourseSubject",
  universityCourseSubjectSchema,
);

export default UniversityCourseSubject;
