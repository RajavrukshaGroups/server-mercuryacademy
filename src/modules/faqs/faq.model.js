import mongoose from "mongoose";

import baseFields from "../../schemas/base.schema.js";

const FAQ_SCOPES = ["GLOBAL", "UNIVERSITY", "UNIVERSITY_COURSE"];

const faqSchema = new mongoose.Schema(
  {
    /**
     * FAQ Scope
     *
     * GLOBAL
     * UNIVERSITY
     * UNIVERSITY_COURSE
     */
    scope: {
      type: String,
      enum: FAQ_SCOPES,
      required: true,
      default: "GLOBAL",
    },

    /**
     * University reference
     * Required only when scope is UNIVERSITY
     */
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      default: null,
    },

    /**
     * University Course reference
     * Required only when scope is UNIVERSITY_COURSE
     */
    universityCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UniversityCourse",
      default: null,
    },

    /**
     * FAQ Question
     */
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    /**
     * FAQ Answer
     */
    answer: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    /**
     * Optional category
     *
     * Admission
     * Fees
     * Eligibility
     * Examination
     */
    category: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

/**
 * Prevent duplicate global FAQ questions
 * and duplicate FAQ questions under the same entity.
 */
faqSchema.index(
  {
    scope: 1,
    university: 1,
    universityCourse: 1,
    question: 1,
  },
  {
    unique: true,
  },
);

/**
 * Filtering indexes
 */
faqSchema.index({
  scope: 1,
});

faqSchema.index({
  university: 1,
});

faqSchema.index({
  universityCourse: 1,
});

faqSchema.index({
  category: 1,
});

const FAQ = mongoose.model("FAQ", faqSchema);

export { FAQ_SCOPES };

export default FAQ;
