import { z } from "zod";

import { LEAD_STATUSES, LEAD_SOURCES } from "../../constants/lead.constants.js";

import { RECORD_STATUS, SORT_ORDER } from "../../constants/common.constants.js";

import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Create Lead
 */
export const createLeadSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters.")
      .max(100, "First name cannot exceed 100 characters."),

    lastName: z.string().trim().max(100).optional(),

    email: z.string().trim().email("Invalid email address."),

    phone: z
      .string()
      .trim()
      .min(8, "Phone number is too short.")
      .max(20, "Phone number cannot exceed 20 characters."),

    universityCourse: objectIdSchema("University Course"),

    country: objectIdSchema("Country", false),

    state: objectIdSchema("State", false),

    city: objectIdSchema("City", false),

    message: z.string().trim().max(2000).optional(),

    source: z.enum(LEAD_SOURCES).optional(),

    leadStatus: z.enum(LEAD_STATUSES).optional(),

    preferredCallbackTime: z.string().trim().max(100).optional(),

    nextFollowUpDate: z.coerce.date().optional(),

    remarks: z.string().trim().max(5000).optional(),

    assignedTo: objectIdSchema("Assigned User", false),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Update Lead
 */
export const updateLeadSchema = z.object({
  params: z.object({
    id: objectIdSchema("Lead"),
  }),

  body: z.object({
    firstName: z.string().trim().min(2).max(100).optional(),

    lastName: z.string().trim().max(100).optional(),

    email: z.string().trim().email().optional(),

    phone: z.string().trim().min(8).max(20).optional(),

    universityCourse: objectIdSchema("University Course", false),

    country: objectIdSchema("Country", false),

    state: objectIdSchema("State", false),

    city: objectIdSchema("City", false),

    message: z.string().trim().max(2000).optional(),

    source: z.enum(LEAD_SOURCES).optional(),

    leadStatus: z.enum(LEAD_STATUSES).optional(),

    preferredCallbackTime: z.string().trim().max(100).optional(),

    nextFollowUpDate: z.coerce.date().optional(),

    remarks: z.string().trim().max(5000).optional(),

    assignedTo: objectIdSchema("Assigned User", false),

    featured: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    status: z.enum(RECORD_STATUS).optional(),
  }),
});

/**
 * Query Parameters
 */
export const leadQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number().min(1).max(100).optional(),

    search: z.string().optional(),

    universityCourse: objectIdSchema("University Course", false),

    country: objectIdSchema("Country", false),

    state: objectIdSchema("State", false),

    city: objectIdSchema("City", false),

    source: z.enum(LEAD_SOURCES).optional(),

    leadStatus: z.enum(LEAD_STATUSES).optional(),

    assignedTo: objectIdSchema("Assigned User", false),

    status: z.enum(RECORD_STATUS).optional(),

    featured: z.coerce.boolean().optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(SORT_ORDER).optional(),
  }),
});

/**
 * Route Params
 */
export const leadIdSchema = z.object({
  params: z.object({
    id: objectIdSchema("Lead"),
  }),
});
