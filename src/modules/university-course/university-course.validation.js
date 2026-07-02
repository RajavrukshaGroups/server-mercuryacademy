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
 * Create University Course
 */
export const createUniversityCourseSchema = z.object({
  body: z.object({
    university: objectIdSchema("University"),

    courseCatalog: objectIdSchema("Course Catalog"),

    specialization: objectIdSchema("Specialization", false),

    duration: z.number().int().min(1, "Duration must be at least 1."),

    durationUnit: z.enum(DURATION_UNITS),

    studyMode: z.enum(STUDY_MODES),

    admissionMode: z.enum(ADMISSION_MODES),

    eligibility: z.string().trim().optional(),

    admissionProcess: z.string().trim().optional(),

    overview: z.string().trim().optional(),

    applicationFee: z.number().min(0).optional(),

    semesterFee: z.number().min(0).optional(),

    annualFee: z.number().min(0).optional(),

    totalFee: z.number().min(0).optional(),

    currency: z.enum(CURRENCIES).optional(),

    degreeAwarded: z.string().trim().max(150).optional(),

    brochure: objectIdSchema("Brochure", false),

    thumbnail: objectIdSchema("Thumbnail", false),

    banner: objectIdSchema("Banner", false),

    applicationUrl: z
      .string()
      .url("Invalid application URL.")
      .optional()
      .or(z.literal("")),

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

  body: z.object({
    university: objectIdSchema("University", false),

    courseCatalog: objectIdSchema("Course Catalog", false),

    specialization: objectIdSchema("Specialization", false),

    duration: z.number().int().min(1).optional(),

    durationUnit: z.enum(DURATION_UNITS).optional(),

    studyMode: z.enum(STUDY_MODES).optional(),

    admissionMode: z.enum(ADMISSION_MODES).optional(),

    eligibility: z.string().trim().optional(),

    admissionProcess: z.string().trim().optional(),

    overview: z.string().trim().optional(),

    applicationFee: z.number().min(0).optional(),

    semesterFee: z.number().min(0).optional(),

    annualFee: z.number().min(0).optional(),

    totalFee: z.number().min(0).optional(),

    currency: z.enum(CURRENCIES).optional(),

    degreeAwarded: z.string().trim().max(150).optional(),

    brochure: objectIdSchema("Brochure", false),

    thumbnail: objectIdSchema("Thumbnail", false),

    banner: objectIdSchema("Banner", false),

    applicationUrl: z
      .string()
      .url("Invalid application URL.")
      .optional()
      .or(z.literal("")),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Query Parameters
 */
export const universityCourseQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    university: objectIdSchema("University", false),

    courseCatalog: objectIdSchema("Course Catalog", false),

    specialization: objectIdSchema("Specialization", false),

    studyMode: z.enum(STUDY_MODES).optional(),

    admissionMode: z.enum(ADMISSION_MODES).optional(),

    status: z.enum(RECORD_STATUS).optional(),

    featured: z.coerce.boolean().optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

/**
 * Route Params
 */
export const universityCourseIdSchema = z.object({
  params: z.object({
    id: objectIdSchema("University Course"),
  }),
});
