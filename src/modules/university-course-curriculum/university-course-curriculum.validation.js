import { z } from "zod";

import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";
import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Create Curriculum
 */
export const createUniversityCourseCurriculumSchema = z.object({
  body: z.object({
    universityCourse: objectIdSchema("University Course"),

    semesterNumber: z
      .number()
      .int()
      .min(1, "Semester number must be at least 1."),

    title: z
      .string()
      .trim()
      .min(2, "Title must be at least 2 characters.")
      .max(100, "Title cannot exceed 100 characters."),

    description: z
      .string()
      .trim()
      .max(1000, "Description cannot exceed 1000 characters.")
      .optional(),

    featured: z.boolean().optional(),

    displayOrder: z
      .number()
      .int()
      .min(0, "Display order cannot be negative.")
      .optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Update Curriculum
 */
export const updateUniversityCourseCurriculumSchema = z.object({
  params: z.object({
    id: objectIdSchema("Curriculum ID"),
  }),

  body: createUniversityCourseCurriculumSchema.shape.body.partial(),
});

/**
 * Curriculum ID
 */
export const universityCourseCurriculumIdSchema = z.object({
  params: z.object({
    id: objectIdSchema("Curriculum ID"),
  }),
});

/**
 * Curriculum List Query
 */
export const universityCourseCurriculumQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    universityCourse: objectIdSchema("University Course", false),

    status: z.enum(RECORD_STATUS).optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});
