import mongoose from "mongoose";

import seoSchema from "../../schemas/seo.schema.js";
import baseFields from "../../schemas/base.schema.js";

const mediaSchema = new mongoose.Schema(
  {
    /**
     * logo.png
     */
    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Generated filename
     * ex:
     * 171999999999-logo.png
     */
    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Cloudinary Public ID
     *
     * mercury-academy/universities/logo
     */
    publicId: {
      type: String,
      required: true,
      trim: true,
      //   unique: true,
    },

    /**
     * Accessible URL
     */
    url: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * image/png
     * application/pdf
     */
    mimeType: {
      type: String,
      required: true,
      trim: true,
    },
    resourceType: {
      type: String,
      enum: ["image", "video", "raw"],
      default: "image",
    },

    /**
     * png
     * jpg
     * pdf
     */
    extension: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    /**
     * Bytes
     */
    size: {
      type: Number,
      required: true,
      min: 0,
    },

    /**
     * For images
     */
    width: {
      type: Number,
      default: null,
    },

    height: {
      type: Number,
      default: null,
    },

    /**
     * Cloudinary Folder
     */
    folder: {
      type: String,
      trim: true,
      default: "general",
    },

    /**
     * Logo
     * Banner
     * Gallery
     */
    altText: {
      type: String,
      trim: true,
      maxlength: 255,
    },

    caption: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    seo: seoSchema,

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

mediaSchema.index({ publicId: 1 }, { unique: true });

mediaSchema.index({
  folder: 1,
});

mediaSchema.index({
  mimeType: 1,
});

const Media = mongoose.model("Media", mediaSchema);

export default Media;
