import { z } from "zod";

import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";
import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Create City
 */
export const createCitySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "City name must be at least 2 characters.")
      .max(100, "City name cannot exceed 100 characters."),

    country: objectIdSchema("Country"),

    state: objectIdSchema("State"),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Update City
 */
export const updateCitySchema = z.object({
  params: z.object({
    id: z.string().min(1, "City ID is required."),
  }),

  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),

    country: objectIdSchema("Country", false),

    state: objectIdSchema("State", false),
    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Query Parameters
 */
export const cityQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    country: objectIdSchema("Country", false),

    state: objectIdSchema("State", false),

    status: z.enum(RECORD_STATUS).optional(),

    featured: z.coerce.boolean().optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

/**
 * Route Params
 */
export const cityIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "City ID is required."),
  }),
});
