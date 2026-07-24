import { z } from "zod";

const slugValidation = z
  .string()
  .trim()
  .min(1, "Slug is required.")
  .max(200, "Slug cannot exceed 200 characters.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain lowercase letters, numbers, and hyphens only.",
  );

export const publicUniversitySlugSchema = z.object({
  params: z.object({
    slug: slugValidation,
  }),
});

export const publicUniversityCourseSlugSchema = z.object({
  params: z.object({
    universitySlug: slugValidation,
    courseSlug: slugValidation,
  }),
});
