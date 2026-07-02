import mongoose from "mongoose";

import seoSchema from "../../schemas/seo.schema.js";
import baseFields from "../../schemas/base.schema.js";

const courseCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      //   unique: true,
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      //   unique: true,
      maxlength: 10,
    },

    description: {
      type: String,
      trim: true,
      maxLength: 500,
    },

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

courseCategorySchema.index(
  {
    slug: 1,
  },
  {
    unique: true,
  },
);

courseCategorySchema.index(
  {
    name: 1,
  },
  {
    unique: true,
  },
);

courseCategorySchema.index({ code: 1 }, { unique: true });

const CourseCategory = mongoose.model("CourseCategory", courseCategorySchema);

export default CourseCategory;
