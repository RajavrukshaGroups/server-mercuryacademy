import mongoose from "mongoose";

import baseFields from "../../schemas/base.schema.js";

const settingsSchema = new mongoose.Schema(
  {
    /**
     * General Settings
     */
    general: {
      siteName: {
        type: String,
        trim: true,
        default: "",
      },

      siteTagline: {
        type: String,
        trim: true,
        default: "",
      },

      siteUrl: {
        type: String,
        trim: true,
        default: "",
      },
    },

    /**
     * Contact Information
     */
    contact: {
      email: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
      },

      supportEmail: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
      },

      phone: {
        type: String,
        trim: true,
        default: "",
      },

      whatsapp: {
        type: String,
        trim: true,
        default: "",
      },

      address: {
        type: String,
        trim: true,
        default: "",
      },

      googleMapsUrl: {
        type: String,
        trim: true,
        default: "",
      },
    },

    /**
     * Branding
     */
    branding: {
      logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        default: null,
      },

      favicon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        default: null,
      },

      defaultBanner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        default: null,
      },
    },

    /**
     * Social Media
     */
    social: {
      facebook: {
        type: String,
        trim: true,
        default: "",
      },

      instagram: {
        type: String,
        trim: true,
        default: "",
      },

      linkedin: {
        type: String,
        trim: true,
        default: "",
      },

      twitter: {
        type: String,
        trim: true,
        default: "",
      },

      youtube: {
        type: String,
        trim: true,
        default: "",
      },
    },

    /**
     * SEO
     */
    seo: {
      metaTitle: {
        type: String,
        trim: true,
        default: "",
      },

      metaDescription: {
        type: String,
        trim: true,
        default: "",
      },

      metaKeywords: {
        type: String,
        trim: true,
        default: "",
      },

      ogImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        default: null,
      },
    },

    /**
     * System Settings
     */
    system: {
      maintenanceMode: {
        type: Boolean,
        default: false,
      },

      currency: {
        type: String,
        trim: true,
        default: "INR",
      },

      timezone: {
        type: String,
        trim: true,
        default: "Asia/Kolkata",
      },

      dateFormat: {
        type: String,
        trim: true,
        default: "DD/MM/YYYY",
      },
    },

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
