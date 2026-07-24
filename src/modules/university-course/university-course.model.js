import mongoose from "mongoose";

import seoSchema from "../../schemas/seo.schema.js";
import baseFields from "../../schemas/base.schema.js";

import {
  DURATION_UNITS,
  STUDY_MODES,
  ADMISSION_MODES,
} from "../../constants/course.constants.js";
import { CURRENCIES } from "../../constants/currency.constants.js";

const universityCourseSchema = new mongoose.Schema(
  {
    /**
     * University
     * Example:
     * Manipal University Jaipur
     */
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },

    /**
     * Master Course
     * Example:
     * MBA
     */
    courseCatalog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseCatalog",
      required: true,
    },

    /**
     * Example:
     * Marketing
     * Finance
     */
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialization",
      default: null,
    },

    /**
     * Public URL slug
     *
     * online-mba
     * online-mba-finance
     * online-mca-data-science
     */
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 200,
    },

    /**
     * Course Duration
     */
    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    durationUnit: {
      type: String,
      enum: DURATION_UNITS,
      default: "Years",
    },

    /**
     * Eligibility
     */
    eligibility: {
      type: String,
      trim: true,
    },

    /**
     * Admission Process
     */
    admissionProcess: {
      type: String,
      trim: true,
    },

    admissionMode: {
      type: String,
      enum: ADMISSION_MODES,
      default: "Direct",
    },

    /**
     * Overview
     */
    overview: {
      type: String,
      trim: true,
    },

    /**
     * Fees
     */
    applicationFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    semesterFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    annualFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    currency: {
      type: String,
      enum: CURRENCIES,
      default: "INR",
    },

    /**
     * Study Mode
     * Online / Offline / Hybrid
     */
    // studyMode: {
    //   type: String,
    //   trim: true,
    // },

    studyMode: {
      type: String,
      enum: STUDY_MODES,
      required: true,
    },

    /**
     * Degree Awarded
     */
    degreeAwarded: {
      type: String,
      trim: true,
    },

    /**
     * Brochure PDF
     */
    brochure: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    /**
     * Thumbnail
     */
    thumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    /**
     * Banner
     */
    banner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    /**
     * Admission Link
     */
    applicationUrl: {
      type: String,
      trim: true,
    },

    seo: seoSchema,

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

/**
 * Same university cannot have the same course specialization twice
 */
universityCourseSchema.index(
  {
    university: 1,
    courseCatalog: 1,
    specialization: 1,
  },
  {
    unique: true,
  },
);

/**
 * Prevent duplicate course/specialization combinations
 * among non-deleted records.
 */

/**
 * Slug must be unique within a university.
 */
universityCourseSchema.index(
  {
    university: 1,
    slug: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);

const UniversityCourse = mongoose.model(
  "UniversityCourse",
  universityCourseSchema,
);

export default UniversityCourse;
