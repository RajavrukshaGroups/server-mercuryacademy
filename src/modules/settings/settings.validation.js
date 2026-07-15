import { z } from "zod";

import { RECORD_STATUS } from "../../constants/common.constants.js";
import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Update Settings
 */
export const updateSettingsSchema = z.object({
  body: z.object({
    general: z
      .object({
        siteName: z.string().trim().max(150).optional(),

        siteTagline: z.string().trim().max(250).optional(),

        siteUrl: z
          .string()
          .trim()
          .url("Invalid website URL.")
          .optional()
          .or(z.literal("")),
      })
      .optional(),

    contact: z
      .object({
        email: z
          .string()
          .trim()
          .email("Invalid email address.")
          .optional()
          .or(z.literal("")),

        supportEmail: z
          .string()
          .trim()
          .email("Invalid support email.")
          .optional()
          .or(z.literal("")),

        phone: z.string().trim().max(20).optional(),

        whatsapp: z.string().trim().max(20).optional(),

        address: z.string().trim().max(500).optional(),

        googleMapsUrl: z
          .string()
          .trim()
          .url("Invalid Google Maps URL.")
          .optional()
          .or(z.literal("")),
      })
      .optional(),

    branding: z
      .object({
        logo: z.union([objectIdSchema("Logo", false), z.null()]),

        favicon: z.union([objectIdSchema("Favicon", false), z.null()]),

        defaultBanner: z.union([
          objectIdSchema("Default Banner", false),
          z.null(),
        ]),
      })
      .optional(),
    social: z
      .object({
        facebook: z
          .string()
          .trim()
          .url("Invalid Facebook URL.")
          .optional()
          .or(z.literal("")),

        instagram: z
          .string()
          .trim()
          .url("Invalid Instagram URL.")
          .optional()
          .or(z.literal("")),

        linkedin: z
          .string()
          .trim()
          .url("Invalid LinkedIn URL.")
          .optional()
          .or(z.literal("")),

        twitter: z
          .string()
          .trim()
          .url("Invalid Twitter URL.")
          .optional()
          .or(z.literal("")),

        youtube: z
          .string()
          .trim()
          .url("Invalid YouTube URL.")
          .optional()
          .or(z.literal("")),
      })
      .optional(),

    seo: z
      .object({
        metaTitle: z.string().trim().max(150).optional(),

        metaDescription: z.string().trim().max(500).optional(),

        metaKeywords: z.string().trim().max(500).optional(),

        ogImage: z.union([objectIdSchema("OG Image", false), z.null()]),
      })
      .optional(),
    system: z
      .object({
        maintenanceMode: z.boolean().optional(),

        currency: z.string().trim().max(10).optional(),

        timezone: z.string().trim().max(100).optional(),

        dateFormat: z.string().trim().max(50).optional(),
      })
      .optional(),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});
