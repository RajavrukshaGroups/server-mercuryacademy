import { z } from "zod";

import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";
import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Create Specialization
 */
export const createSpecializationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Specialization name must be at least 2 characters.")
      .max(150, "Specialization name cannot exceed 150 characters."),

    code: z
      .string()
      .trim()
      .min(2, "Specialization code must be at least 2 characters.")
      .max(20, "Specialization code cannot exceed 20 characters."),

    courseCatalog: objectIdSchema("Course Catalog"),

    description: z
      .string()
      .trim()
      .max(1000, "Description cannot exceed 1000 characters.")
      .optional(),

    icon: objectIdSchema("Media", false),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Update Specialization
 */
export const updateSpecializationSchema = z.object({
  params: z.object({
    id: objectIdSchema("Specialization"),
  }),

  body: z.object({
    name: z.string().trim().min(2).max(150).optional(),

    code: z.string().trim().min(2).max(20).optional(),

    courseCatalog: objectIdSchema("Course Catalog", false),

    description: z.string().trim().max(1000).optional(),

    icon: objectIdSchema("Media", false),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Query Parameters
 */
export const specializationQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    courseCatalog: objectIdSchema("Course Catalog", false),

    featured: z.coerce.boolean().optional(),

    status: z.enum(RECORD_STATUS).optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

/**
 * Route Params
 */
export const specializationIdSchema = z.object({
  params: z.object({
    id: objectIdSchema("Specialization"),
  }),
});
