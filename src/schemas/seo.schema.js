// src/schemas/seo.schema.js

import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },

    metaDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },

    keywords: [
      {
        type: String,
        trim: true,
      },
    ],

    canonical: {
      type: String,
      trim: true,
    },

    robots: {
      type: String,
      default: "index,follow",
    },

    ogImage: {
      type: String,
      trim: true,
    },

    schemaMarkup: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

export default seoSchema;
