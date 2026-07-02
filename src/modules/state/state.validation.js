import { z } from "zod";

import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";

/**
 * Create State
 */
export const createStateSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "State name must be at least 2 characters.")
      .max(100, "State name cannot exceed 100 characters."),

    code: z
      .string()
      .trim()
      .min(2, "State code must be at least 2 characters.")
      .max(10, "State code cannot exceed 10 characters.")
      .transform((value) => value.toUpperCase()),

    country: z.string().min(1, "Country is required."),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Update State
 */
export const updateStateSchema = z.object({
  params: z.object({
    id: z.string().min(1, "State ID is required."),
  }),

  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),

    code: z
      .string()
      .trim()
      .min(2)
      .max(10)
      .transform((value) => value.toUpperCase())
      .optional(),

    country: z.string().optional(),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Query Parameters
 */
export const stateQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    country: z.string().optional(),

    status: z.enum(RECORD_STATUS).optional(),

    featured: z.coerce.boolean().optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

/**
 * Route Params
 */
export const stateIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "State ID is required."),
  }),
});
