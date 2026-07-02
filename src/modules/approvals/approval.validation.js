import { z } from "zod";
import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";
import { objectIdSchema } from "../../validations/common/object-id.validation.js";
export const createApprovalSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Approval name must be at least 2 characters.")
      .max(100, "Approval name cannot exceed 100 characters."),

    shortName: z
      .string()
      .trim()
      .min(2, "Short name must be at least 2 characters.")
      .max(20, "Short name cannot exceed 20 characters."),

    description: z.string().trim().max(500).optional(),

    logo: objectIdSchema("Logo", false),
    websiteUrl: z
      .string()
      .url("Invalid website URL.")
      .optional()
      .or(z.literal("")),

    displayOrder: z.number().int().min(0).optional(),

    featured: z.boolean().optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

export const updateApprovalSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Approval ID is required."),
  }),

  body: createApprovalSchema.shape.body.partial(),
});

export const approvalIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Approval ID is required."),
  }),
});

export const approvalQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    status: z.enum(RECORD_STATUS).optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});
