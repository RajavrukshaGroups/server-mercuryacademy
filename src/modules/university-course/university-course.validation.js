import { z } from "zod";

import {
  DURATION_UNITS,
  STUDY_MODES,
  ADMISSION_MODES,
} from "../../constants/course.constants.js";

import { CURRENCIES } from "../../constants/currency.constants.js";

import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";

import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Fields permitted for sorting university courses.
 */
const UNIVERSITY_COURSE_SORT_FIELDS = [
  "createdAt",
  "updatedAt",
  "displayOrder",
  "duration",
  "applicationFee",
  "semesterFee",
  "annualFee",
  "totalFee",
];

/**
 * Reusable public course slug validation.
 *
 * Examples:
 * online-mba
 * online-mba-finance
 * online-mca-data-science
 */
const universityCourseSlugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Slug is required.")
  .max(200, "Slug cannot exceed 200 characters.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain letters, numbers, and single hyphens only.",
  );

/**
 * Create University Course
 */
export const createUniversityCourseSchema = z.object({
  body: z.object({
    university: objectIdSchema("University"),

    courseCatalog: objectIdSchema("Course Catalog"),

    specialization: objectIdSchema("Specialization", false)
      .nullable()
      .optional(),

    slug: universityCourseSlugSchema,

    duration: z
      .number()
      .int("Duration must be a whole number.")
      .min(1, "Duration must be at least 1."),

    durationUnit: z.enum(DURATION_UNITS),

    studyMode: z.enum(STUDY_MODES),

    admissionMode: z.enum(ADMISSION_MODES),

    eligibility: z.string().trim().optional(),

    admissionProcess: z.string().trim().optional(),

    overview: z.string().trim().optional(),

    applicationFee: z
      .number()
      .min(0, "Application fee cannot be negative.")
      .optional(),

    semesterFee: z
      .number()
      .min(0, "Semester fee cannot be negative.")
      .optional(),

    annualFee: z.number().min(0, "Annual fee cannot be negative.").optional(),

    totalFee: z.number().min(0, "Total fee cannot be negative.").optional(),

    currency: z.enum(CURRENCIES).optional(),

    degreeAwarded: z.string().trim().max(150).optional(),

    brochure: objectIdSchema("Brochure", false).nullable().optional(),

    thumbnail: objectIdSchema("Thumbnail", false).nullable().optional(),

    banner: objectIdSchema("Banner", false).nullable().optional(),

    applicationUrl: z
      .union([z.string().trim().url("Invalid application URL."), z.literal("")])
      .optional(),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Update University Course
 */
export const updateUniversityCourseSchema = z.object({
  params: z.object({
    id: objectIdSchema("University Course"),
  }),

  body: z
    .object({
      university: objectIdSchema("University", false),

      courseCatalog: objectIdSchema("Course Catalog", false),

      specialization: objectIdSchema("Specialization", false)
        .nullable()
        .optional(),

      slug: universityCourseSlugSchema.optional(),

      duration: z
        .number()
        .int("Duration must be a whole number.")
        .min(1, "Duration must be at least 1.")
        .optional(),

      durationUnit: z.enum(DURATION_UNITS).optional(),

      studyMode: z.enum(STUDY_MODES).optional(),

      admissionMode: z.enum(ADMISSION_MODES).optional(),

      eligibility: z.string().trim().optional(),

      admissionProcess: z.string().trim().optional(),

      overview: z.string().trim().optional(),

      applicationFee: z
        .number()
        .min(0, "Application fee cannot be negative.")
        .optional(),

      semesterFee: z
        .number()
        .min(0, "Semester fee cannot be negative.")
        .optional(),

      annualFee: z.number().min(0, "Annual fee cannot be negative.").optional(),

      totalFee: z.number().min(0, "Total fee cannot be negative.").optional(),

      currency: z.enum(CURRENCIES).optional(),

      degreeAwarded: z.string().trim().max(150).optional(),

      brochure: objectIdSchema("Brochure", false).nullable().optional(),

      thumbnail: objectIdSchema("Thumbnail", false).nullable().optional(),

      banner: objectIdSchema("Banner", false).nullable().optional(),

      applicationUrl: z
        .union([
          z.string().trim().url("Invalid application URL."),
          z.literal(""),
        ])
        .optional(),

      featured: z.boolean().optional(),

      displayOrder: z.number().int().min(0).optional(),

      status: z.enum(RECORD_STATUS).optional(),
    })
    .refine((body) => Object.keys(body).length > 0, {
      message: "At least one field must be provided for update.",
    }),
});

/**
 * Query Parameters
 */
export const universityCourseQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).optional(),

    limit: z.coerce.number().int().min(1).max(100).optional(),

    search: z.string().trim().optional(),

    university: objectIdSchema("University", false),

    courseCatalog: objectIdSchema("Course Catalog", false),

    specialization: objectIdSchema("Specialization", false),

    studyMode: z.enum(STUDY_MODES).optional(),

    admissionMode: z.enum(ADMISSION_MODES).optional(),

    status: z.enum(RECORD_STATUS).optional(),

    featured: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),

    sortBy: z.enum(UNIVERSITY_COURSE_SORT_FIELDS).optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

/**
 * Route Parameters
 */
export const universityCourseIdSchema = z.object({
  params: z.object({
    id: objectIdSchema("University Course"),
  }),
});
