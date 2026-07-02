import mongoose from "mongoose";

import seoSchema from "../../schemas/seo.schema.js";
import baseFields from "../../schemas/base.schema.js";
import { UNIVERSITY_TYPES } from "../../constants/university.constants.js";

const universitySchema = new mongoose.Schema(
  {
    /**
     * Manipal University Jaipur
     */
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    /**
     * MUJ
     */
    shortName: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    /**
     * MUJ
     */
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 20,
    },

    /**
     * manipal-university-jaipur
     */
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    establishedYear: {
      type: Number,
      min: 1800,
    },

    universityType: {
      type: String,
      enum: UNIVERSITY_TYPES,
    },

    websiteUrl: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    /**
     * Will reference Country module later
     */
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },

    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },

    address: {
      type: String,
      trim: true,
    },

    googleMapUrl: {
      type: String,
      trim: true,
    },

    logo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    banner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    thumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    gallery: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Media",
        },
      ],
      default: [],
    },

    overview: {
      type: String,
      trim: true,
    },

    vision: {
      type: String,
      trim: true,
    },

    mission: {
      type: String,
      trim: true,
    },

    approvals: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Approval",
        },
      ],
      default: [],
    },

    seo: seoSchema,

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

universitySchema.index({ slug: 1 }, { unique: true });

universitySchema.index({ name: 1 }, { unique: true });

universitySchema.index({ code: 1 }, { unique: true });

universitySchema.index({
  country: 1,
  state: 1,
  city: 1,
});

const University = mongoose.model("University", universitySchema);

export default University;
