import { z } from "zod";

import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";

import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Reusable request body
 */
const universityCourseSubjectBodySchema = z.object({
  universityCourseCurriculum: objectIdSchema("University Course Curriculum"),

  name: z
    .string()
    .trim()
    .min(2, "Subject name must be at least 2 characters.")
    .max(150, "Subject name cannot exceed 150 characters."),

  code: z
    .string()
    .trim()
    .max(30, "Subject code cannot exceed 30 characters.")
    .optional()
    .or(z.literal("")),

  credits: z.number().min(0, "Credits cannot be negative."),

  description: z
    .string()
    .trim()
    .max(5000, "Description cannot exceed 5000 characters.")
    .optional()
    .or(z.literal("")),

  featured: z.boolean().optional(),

  displayOrder: z
    .number()
    .int()
    .min(0, "Display order cannot be negative.")
    .optional(),

  status: z.enum(RECORD_STATUS).optional(),
});

/**
 * Create Subject
 */
export const createUniversityCourseSubjectSchema = z.object({
  body: universityCourseSubjectBodySchema,
});

/**
 * Update Subject
 */
export const updateUniversityCourseSubjectSchema = z.object({
  params: z.object({
    id: objectIdSchema("University Course Subject"),
  }),

  body: universityCourseSubjectBodySchema.partial(),
});

/**
 * Subject ID
 */
export const universityCourseSubjectIdSchema = z.object({
  params: z.object({
    id: objectIdSchema("University Course Subject"),
  }),
});

/**
 * Subject list query
 */
export const universityCourseSubjectQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().trim().optional(),

    universityCourseCurriculum: objectIdSchema(
      "University Course Curriculum",
      false,
    ),

    status: z.enum(RECORD_STATUS).optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});
