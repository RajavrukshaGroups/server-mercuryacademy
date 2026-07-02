import { z } from "zod";

import {
  COURSE_LEVELS,
  DEGREE_TYPES,
  DURATION_UNITS,
} from "../../constants/course.constants.js";
import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";
import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Create Course Catalog
 */
export const createCourseCatalogSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Course name must be at least 2 characters.")
      .max(150, "Course name cannot exceed 150 characters."),

    shortName: z
      .string()
      .trim()
      .min(2, "Short name must be at least 2 characters.")
      .max(20, "Short name cannot exceed 20 characters."),

    code: z
      .string()
      .trim()
      .min(2, "Course code must be at least 2 characters.")
      .max(20, "Course code cannot exceed 20 characters."),

    category: objectIdSchema("Course Category"),
    level: z.enum(COURSE_LEVELS),

    degreeType: z.enum(DEGREE_TYPES),

    duration: z.number().int().min(1, "Duration must be at least 1."),

    durationUnit: z.enum(DURATION_UNITS),

    overview: z.string().trim().optional(),

    icon: objectIdSchema("Icon", false),
    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Update Course Catalog
 */
export const updateCourseCatalogSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Course Catalog ID is required."),
  }),

  body: z.object({
    name: z.string().trim().min(2).max(150).optional(),

    shortName: z.string().trim().min(2).max(20).optional(),

    code: z.string().trim().min(2).max(20).optional(),

    category: objectIdSchema("Course Category", false),
    level: z.enum(COURSE_LEVELS).optional(),

    degreeType: z.enum(DEGREE_TYPES).optional(),

    duration: z.number().int().min(1).optional(),

    durationUnit: z.enum(DURATION_UNITS).optional(),

    overview: z.string().trim().optional(),

    icon: objectIdSchema("Icon", false),
    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Query Parameters
 */
export const courseCatalogQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    status: z.enum(RECORD_STATUS).optional(),

    category: objectIdSchema("Course Category", false),
    level: z.enum(COURSE_LEVELS).optional(),

    degreeType: z.enum(DEGREE_TYPES).optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

/**
 * Route Params
 */
export const courseCatalogIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Course Catalog ID is required."),
  }),
});
