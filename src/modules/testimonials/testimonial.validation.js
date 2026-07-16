import { z } from "zod";

import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";

import { objectIdSchema } from "../../validations/common/object-id.validation.js";

export const TESTIMONIAL_SCOPES = ["GLOBAL", "UNIVERSITY", "UNIVERSITY_COURSE"];

/**
 * Reusable Testimonial Body
 */
const testimonialBodySchema = z
  .object({
    scope: z.enum(TESTIMONIAL_SCOPES),

    university: objectIdSchema("University", false).nullable().optional(),

    universityCourse: objectIdSchema("University Course", false)
      .nullable()
      .optional(),

    studentName: z
      .string()
      .trim()
      .min(2, "Student name must be at least 2 characters.")
      .max(150, "Student name cannot exceed 150 characters."),

    designation: z
      .string()
      .trim()
      .max(150, "Designation cannot exceed 150 characters.")
      .optional()
      .or(z.literal("")),

    review: z
      .string()
      .trim()
      .min(10, "Review must be at least 10 characters.")
      .max(3000, "Review cannot exceed 3000 characters."),

    rating: z
      .number()
      .min(1, "Rating must be at least 1.")
      .max(5, "Rating cannot exceed 5."),

    photo: objectIdSchema("Photo", false).nullable().optional(),

    featured: z.boolean().optional(),

    displayOrder: z
      .number()
      .int("Display order must be a whole number.")
      .min(0, "Display order cannot be negative.")
      .optional(),

    status: z.enum(RECORD_STATUS).optional(),
  })
  .superRefine((data, ctx) => {
    /**
     * Global Testimonial
     */
    if (data.scope === "GLOBAL") {
      if (data.university) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["university"],
          message: "University must be empty for a global testimonial.",
        });
      }

      if (data.universityCourse) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["universityCourse"],
          message: "University Course must be empty for a global testimonial.",
        });
      }
    }

    /**
     * University Testimonial
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
          message:
            "University Course must be empty for a university testimonial.",
        });
      }
    }

    /**
     * University Course Testimonial
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
          message:
            "University must be empty for a university course testimonial.",
        });
      }
    }
  });

/**
 * Create Testimonial
 */
export const createTestimonialSchema = z.object({
  body: testimonialBodySchema,
});

/**
 * Update Testimonial
 */
export const updateTestimonialSchema = z.object({
  params: z.object({
    id: objectIdSchema("Testimonial"),
  }),

  body: z.object({
    scope: z.enum(TESTIMONIAL_SCOPES).optional(),

    university: objectIdSchema("University", false).nullable().optional(),

    universityCourse: objectIdSchema("University Course", false)
      .nullable()
      .optional(),

    studentName: z
      .string()
      .trim()
      .min(2, "Student name must be at least 2 characters.")
      .max(150, "Student name cannot exceed 150 characters.")
      .optional(),

    designation: z
      .string()
      .trim()
      .max(150, "Designation cannot exceed 150 characters.")
      .optional()
      .or(z.literal("")),

    review: z
      .string()
      .trim()
      .min(10, "Review must be at least 10 characters.")
      .max(3000, "Review cannot exceed 3000 characters.")
      .optional(),

    rating: z
      .number()
      .min(1, "Rating must be at least 1.")
      .max(5, "Rating cannot exceed 5.")
      .optional(),

    photo: objectIdSchema("Photo", false).nullable().optional(),

    featured: z.boolean().optional(),

    displayOrder: z
      .number()
      .int("Display order must be a whole number.")
      .min(0, "Display order cannot be negative.")
      .optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Testimonial ID
 */
export const testimonialIdSchema = z.object({
  params: z.object({
    id: objectIdSchema("Testimonial"),
  }),
});

/**
 * Testimonial Query
 */
export const testimonialQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().trim().optional(),

    scope: z.enum(TESTIMONIAL_SCOPES).optional(),

    university: objectIdSchema("University", false).nullable().optional(),

    universityCourse: objectIdSchema("University Course", false)
      .nullable()
      .optional(),

    rating: z.coerce.number().min(1).max(5).optional(),

    status: z.enum(RECORD_STATUS).optional(),

    featured: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});
