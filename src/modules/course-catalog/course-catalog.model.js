import mongoose from "mongoose";

import seoSchema from "../../schemas/seo.schema.js";
import baseFields from "../../schemas/base.schema.js";

import {
  COURSE_LEVELS,
  DEGREE_TYPES,
  DURATION_UNITS,
} from "../../constants/course.constants.js";

const courseCatalogSchema = new mongoose.Schema(
  {
    /**
     * Master of Business Administration
     */
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    /**
     * MBA
     */
    shortName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 20,
    },

    /**
     * MBA
     */
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      //   unique: true,
      maxlength: 20,
    },

    /**
     * master-of-business-administration
     */
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      //   unique: true,
    },

    /**
     * Management
     */
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseCategory",
      required: true,
    },

    /**
     * UG / PG / Diploma
     */
    level: {
      type: String,
      enum: COURSE_LEVELS,
      required: true,
    },

    /**
     * Bachelor / Master
     */
    degreeType: {
      type: String,
      enum: DEGREE_TYPES,
      required: true,
    },

    /**
     * 2
     */
    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    /**
     * Years / Months
     */
    durationUnit: {
      type: String,
      enum: DURATION_UNITS,
      default: "Years",
    },

    /**
     * Generic overview of course
     */
    overview: {
      type: String,
      trim: true,
    },

    /**
     * Course icon
     */
    icon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },

    seo: seoSchema,

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

courseCatalogSchema.index({ code: 1 }, { unique: true });

courseCatalogSchema.index(
  {
    slug: 1,
  },
  {
    unique: true,
  },
);

courseCatalogSchema.index(
  {
    name: 1,
  },
  {
    unique: true,
  },
);

const CourseCatalog = mongoose.model("CourseCatalog", courseCatalogSchema);

export default CourseCatalog;
