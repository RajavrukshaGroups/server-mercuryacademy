// src/schemas/seo.schema.js

import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    /**
     * <title>
     */
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },

    /**
     * Meta Description
     */
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },

    /**
     * Keywords
     */
    keywords: [
      {
        type: String,
        trim: true,
      },
    ],

    /**
     * Canonical URL
     */
    canonical: {
      type: String,
      trim: true,
    },

    /**
     * index,follow
     * noindex,nofollow
     */
    robots: {
      type: String,
      default: "index,follow",
    },

    /**
     * Open Graph
     */
    ogTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },

    ogDescription: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    /**
     * Media Reference
     */
    ogImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    /**
     * Twitter Card
     */
    twitterTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },

    twitterDescription: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    twitterImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    /**
     * JSON-LD
     */
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
