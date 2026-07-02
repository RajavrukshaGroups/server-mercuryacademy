import { z } from "zod";

import { objectIdSchema } from "../../validations/common/object-id.validation.js";

/**
 * Password Schema
 */
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(100, "Password cannot exceed 100 characters.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  );

/**
 * Login
 */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Invalid email address."),

    password: passwordSchema,
  }),
});

/**
 * Change Password
 */
export const changePasswordSchema = z
  .object({
    body: z.object({
      currentPassword: z.string().min(1, "Current password is required."),

      newPassword: passwordSchema,

      confirmPassword: z.string().min(1, "Confirm password is required."),
    }),
  })
  .refine((data) => data.body.newPassword === data.body.confirmPassword, {
    path: ["body", "confirmPassword"],
    message: "Passwords do not match.",
  });

/**
 * Update Profile
 */
export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters.")
      .max(100)
      .optional(),

    lastName: z.string().trim().max(100).optional(),

    phone: z.string().trim().min(8).max(20).optional(),

    profileImage: objectIdSchema("Profile Image", false),
  }),
});

/**
 * User ID Params
 */
export const userIdSchema = z.object({
  params: z.object({
    id: objectIdSchema("User"),
  }),
});
