import { z } from "zod";

import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";

/**
 * Create Country
 */
export const createCountrySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Country name must be at least 2 characters.")
      .max(100, "Country name cannot exceed 100 characters."),

    iso2Code: z
      .string()
      .trim()
      .length(2, "ISO2 Code must be exactly 2 characters.")
      .transform((value) => value.toUpperCase()),

    iso3Code: z
      .string()
      .trim()
      .length(3, "ISO3 Code must be exactly 3 characters.")
      .transform((value) => value.toUpperCase()),

    phoneCode: z
      .string()
      .trim()
      .min(2, "Phone code is required.")
      .max(10, "Phone code cannot exceed 10 characters."),

    flag: z.string().optional(),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Update Country
 */
export const updateCountrySchema = z.object({
  params: z.object({
    id: z.string().min(1, "Country ID is required."),
  }),

  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),

    iso2Code: z
      .string()
      .trim()
      .length(2)
      .transform((value) => value.toUpperCase())
      .optional(),

    iso3Code: z
      .string()
      .trim()
      .length(3)
      .transform((value) => value.toUpperCase())
      .optional(),

    phoneCode: z.string().trim().max(10).optional(),

    flag: z.string().optional(),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Query Parameters
 */
export const countryQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    status: z.enum(RECORD_STATUS).optional(),

    featured: z.coerce.boolean().optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

/**
 * Route Params
 */
export const countryIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Country ID is required."),
  }),
});
