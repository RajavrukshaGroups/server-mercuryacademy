import { z } from "zod";

import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";

import { objectIdSchema } from "../../validations/common/object-id.validation.js";

const FAQ_SCOPES = ["GLOBAL", "UNIVERSITY", "UNIVERSITY_COURSE"];

/**
 * Reusable FAQ body schema
 */
const faqBodySchema = z
  .object({
    scope: z.enum(FAQ_SCOPES),

    university: objectIdSchema("University", false).nullable().optional(),

    universityCourse: objectIdSchema("University Course", false)
      .nullable()
      .optional(),

    question: z
      .string()
      .trim()
      .min(5, "Question must be at least 5 characters.")
      .max(300, "Question cannot exceed 300 characters."),

    answer: z
      .string()
      .trim()
      .min(10, "Answer must be at least 10 characters.")
      .max(5000, "Answer cannot exceed 5000 characters."),

    category: z
      .string()
      .trim()
      .max(100, "Category cannot exceed 100 characters.")
      .optional()
      .or(z.literal("")),

    featured: z.boolean().optional(),

    displayOrder: z
      .number()
      .int()
      .min(0, "Display order cannot be negative.")
      .optional(),

    status: z.enum(RECORD_STATUS).optional(),
  })
  .superRefine((data, ctx) => {
    /**
     * Global FAQ
     */
    if (data.scope === "GLOBAL") {
      if (data.university) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["university"],
          message: "University must be empty for a global FAQ.",
        });
      }

      if (data.universityCourse) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["universityCourse"],
          message: "University Course must be empty for a global FAQ.",
        });
      }
    }

    /**
     * University FAQ
     */
    if (data.scope === "UNIVERSITY") {
      if (!data.university) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["university"],
          message: "University is required.",
        });
      }

      if (data.universityCourse) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["universityCourse"],
          message: "University Course must be empty for a university FAQ.",
        });
      }
    }

    /**
     * University Course FAQ
     */
    if (data.scope === "UNIVERSITY_COURSE") {
      if (!data.universityCourse) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["universityCourse"],
          message: "University Course is required.",
        });
      }

      if (data.university) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["university"],
          message: "University must be empty for a university course FAQ.",
        });
      }
    }
  });

/**
 * Create FAQ
 */
export const createFaqSchema = z.object({
  body: faqBodySchema,
});

/**
 * Update FAQ
 *
 * We use a partial schema here, but scope-based validation
 * should also be checked again inside the service using the
 * existing FAQ values merged with the incoming payload.
 */
export const updateFaqSchema = z.object({
  params: z.object({
    id: objectIdSchema("FAQ"),
  }),

  body: z.object({
    scope: z.enum(FAQ_SCOPES).optional(),

    university: objectIdSchema("University", false).nullable().optional(),

    universityCourse: objectIdSchema("University Course", false)
      .nullable()
      .optional(),

    question: z
      .string()
      .trim()
      .min(5, "Question must be at least 5 characters.")
      .max(300, "Question cannot exceed 300 characters.")
      .optional(),

    answer: z
      .string()
      .trim()
      .min(10, "Answer must be at least 10 characters.")
      .max(5000, "Answer cannot exceed 5000 characters.")
      .optional(),

    category: z
      .string()
      .trim()
      .max(100, "Category cannot exceed 100 characters.")
      .optional()
      .or(z.literal("")),

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
 * FAQ ID
 */
export const faqIdSchema = z.object({
  params: z.object({
    id: objectIdSchema("FAQ"),
  }),
});

/**
 * FAQ list query
 */
export const faqQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().trim().optional(),

    scope: z.enum(FAQ_SCOPES).optional(),

    university: objectIdSchema("University", false),

    universityCourse: objectIdSchema("University Course", false),

    category: z.string().trim().optional(),

    status: z.enum(RECORD_STATUS).optional(),

    featured: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

export { FAQ_SCOPES };
