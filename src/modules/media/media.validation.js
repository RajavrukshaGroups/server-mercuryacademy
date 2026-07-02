import { z } from "zod";

import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";

import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Create Media
 *
 * File itself is validated by Multer.
 * This schema validates only metadata.
 */
export const createMediaSchema = z.object({
  body: z.object({
    folder: z.string().trim().min(1, "Folder is required.").max(100).optional(),

    altText: z.string().trim().max(255).optional(),

    caption: z.string().trim().max(500).optional(),

    featured: z
      .union([
        z.boolean(),
        z.enum(["true", "false"]).transform((v) => v === "true"),
      ])
      .optional(),

    displayOrder: z.coerce.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),

    createdBy: objectIdSchema("User", false),
  }),
});

/**
 * Update Media
 */
export const updateMediaSchema = z.object({
  params: z.object({
    id: objectIdSchema("Media"),
  }),

  body: z.object({
    folder: z.string().trim().max(100).optional(),

    altText: z.string().trim().max(255).optional(),

    caption: z.string().trim().max(500).optional(),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),

    updatedBy: objectIdSchema("User", false),
  }),
});

/**
 * Query Parameters
 */
export const mediaQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    folder: z.string().optional(),

    mimeType: z.string().optional(),

    resourceType: z.enum(["image", "video", "raw"]).optional(),

    featured: z.coerce.boolean().optional(),

    status: z.enum(RECORD_STATUS).optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

/**
 * Route Params
 */
export const mediaIdSchema = z.object({
  params: z.object({
    id: objectIdSchema("Media"),
  }),
});
