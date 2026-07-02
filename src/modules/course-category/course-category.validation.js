import { z } from "zod";
import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";
import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Create Course Category
 */
export const createCourseCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Category name must be at least 2 characters.")
      .max(100, "Category name cannot exceed 100 characters."),

    code: z
      .string()
      .trim()
      .min(2, "Category code must be at least 2 characters.")
      .max(10, "Category code cannot exceed 10 characters."),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional(),

    icon: objectIdSchema("Icon", false),
    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Update Course Category
 */
export const updateCourseCategorySchema = z.object({
  params: z.object({
    id: z.string().min(1, "Course Category ID is required."),
  }),

  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),

    code: z.string().trim().min(2).max(10).optional(),

    description: z.string().trim().max(500).optional(),

    icon: objectIdSchema("Icon", false),
    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Query Parameters
 */
export const courseCategoryQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    status: z.enum(RECORD_STATUS).optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

/**
 * Route Params
 */
export const courseCategoryIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Course Category ID is required."),
  }),
});
