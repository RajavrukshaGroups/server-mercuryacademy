import mongoose from "mongoose";

import seoSchema from "../../schemas/seo.schema.js";
import baseFields from "../../schemas/base.schema.js";

const specializationSchema = new mongoose.Schema(
  {
    /**
     * Marketing
     * Data Science
     * Artificial Intelligence
     */
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    /**
     * MKT
     * DS
     * AI
     */
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 20,
    },

    /**
     * marketing
     * data-science
     */
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    /**
     * Parent Course
     * Example:
     * MBA
     * MCA
     * BBA
     */
    courseCatalog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseCatalog",
      required: true,
    },

    /**
     * Optional description
     */
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    /**
     * Icon/Image
     */
    icon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    seo: seoSchema,

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

/**
 * Unique Indexes
 */
specializationSchema.index(
  { slug: 1 },
  { unique: true },
);

specializationSchema.index(
  { code: 1 },
  { unique: true },
);

/**
 * Search & Filter Index
 */
specializationSchema.index({
  courseCatalog: 1,
});

const Specialization = mongoose.model(
  "Specialization",
  specializationSchema,
);

export default Specialization;