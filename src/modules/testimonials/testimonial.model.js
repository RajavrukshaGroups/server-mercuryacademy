import mongoose from "mongoose";

import baseFields from "../../schemas/base.schema.js";

export const TESTIMONIAL_SCOPES = ["GLOBAL", "UNIVERSITY", "UNIVERSITY_COURSE"];

const testimonialSchema = new mongoose.Schema(
  {
    /**
     * GLOBAL / UNIVERSITY / UNIVERSITY_COURSE
     */
    scope: {
      type: String,
      enum: TESTIMONIAL_SCOPES,
      required: true,
      default: "GLOBAL",
    },

    /**
     * Required only for UNIVERSITY scope
     */
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      default: null,
    },

    /**
     * Required only for UNIVERSITY_COURSE scope
     */
    universityCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UniversityCourse",
      default: null,
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    /**
     * Example: Working Professional
     */
    designation: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    review: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },

    /**
     * Student photo
     */
    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

testimonialSchema.index({
  scope: 1,
});

testimonialSchema.index({
  university: 1,
});

testimonialSchema.index({
  universityCourse: 1,
});

testimonialSchema.index({
  rating: 1,
});

testimonialSchema.index({
  featured: 1,
  displayOrder: 1,
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
