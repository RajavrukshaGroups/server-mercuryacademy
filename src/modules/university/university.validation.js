import { z } from "zod";

import { UNIVERSITY_TYPES } from "../../constants/university.constants.js";
import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";
import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Create University
 */
export const createUniversitySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "University name must be at least 2 characters.")
      .max(150, "University name cannot exceed 150 characters."),

    shortName: z
      .string()
      .trim()
      .min(2, "Short name must be at least 2 characters.")
      .max(20, "Short name cannot exceed 20 characters.")
      .optional(),

    code: z
      .string()
      .trim()
      .min(2, "University code must be at least 2 characters.")
      .max(20, "University code cannot exceed 20 characters."),

    establishedYear: z
      .number()
      .int()
      .min(1800)
      .max(new Date().getFullYear())
      .optional(),

    universityType: z.enum(UNIVERSITY_TYPES).optional(),

    websiteUrl: z
      .string()
      .url("Invalid website URL.")
      .optional()
      .or(z.literal("")),

    email: z
      .string()
      .email("Invalid email address.")
      .optional()
      .or(z.literal("")),

    phone: z.string().trim().max(20).optional(),

    country: objectIdSchema("Country"),

    state: objectIdSchema("State"),

    city: objectIdSchema("City"),
    address: z.string().trim().max(500).optional(),

    googleMapUrl: z
      .string()
      .url("Invalid Google Map URL.")
      .optional()
      .or(z.literal("")),

    logo: objectIdSchema("Logo", false),

    banner: objectIdSchema("Banner", false),

    thumbnail: objectIdSchema("Thumbnail", false),

    gallery: z.array(objectIdSchema("Media")).optional(),
    overview: z.string().trim().optional(),

    vision: z.string().trim().optional(),

    mission: z.string().trim().optional(),

    approvals: z.array(objectIdSchema("Approval")).optional(),
    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Update University
 */
export const updateUniversitySchema = z.object({
  params: z.object({
    id: z.string().min(1, "University ID is required."),
  }),

  body: z.object({
    name: z.string().trim().min(2).max(150).optional(),

    shortName: z.string().trim().min(2).max(20).optional(),

    code: z.string().trim().min(2).max(20).optional(),

    establishedYear: z
      .number()
      .int()
      .min(1800)
      .max(new Date().getFullYear())
      .optional(),

    universityType: z.enum(UNIVERSITY_TYPES).optional(),

    websiteUrl: z.string().url().optional().or(z.literal("")),

    email: z.string().email().optional().or(z.literal("")),

    phone: z.string().trim().max(20).optional(),

    country: objectIdSchema("Country", false),

    state: objectIdSchema("State", false),

    city: objectIdSchema("City", false),

    address: z.string().trim().max(500).optional(),

    googleMapUrl: z.string().url().optional().or(z.literal("")),

    logo: objectIdSchema("Logo", false),

    banner: objectIdSchema("Banner", false),

    thumbnail: objectIdSchema("Thumbnail", false),

    gallery: z.array(objectIdSchema("Media")).optional(),
    overview: z.string().trim().optional(),

    vision: z.string().trim().optional(),

    mission: z.string().trim().optional(),

    approvals: z.array(objectIdSchema("Approval")).optional(),
    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Query Parameters
 */
export const universityQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    status: z.enum(RECORD_STATUS).optional(),

    universityType: z.enum(UNIVERSITY_TYPES).optional(),

    country: objectIdSchema("Country", false),

    state: objectIdSchema("State", false),

    city: objectIdSchema("City", false),

    featured: z.coerce.boolean().optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

/**
 * Route Params
 */
export const universityIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "University ID is required."),
  }),
});

export const universitySlugSchema = z.object({
  params: z.object({
    slug: z
      .string()
      .trim()
      .min(1, "University slug is required.")
      .max(180, "University slug is too long.")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid university slug."),
  }),
});

export const universityIdentifierSchema = z.object({
  params: z.object({
    identifier: z
      .string({
        required_error: "University identifier is required.",
      })
      .trim()
      .min(1, "University identifier is required.")
      .max(180, "University identifier cannot exceed 180 characters.")
      .refine(
        (value) => {
          const isObjectId = /^[a-f\d]{24}$/i.test(value);

          const isSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

          return isObjectId || isSlug;
        },
        {
          message:
            "Identifier must be a valid MongoDB ObjectId or university slug.",
        },
      ),
  }),
});
