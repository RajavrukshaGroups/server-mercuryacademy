import { z } from "zod";

export const universityCourseSubjectSchema = z.object({
  universityCourseCurriculum: z.string().min(1, "Curriculum is required."),

  name: z
    .string()
    .trim()
    .min(1, "Subject name is required.")
    .max(150, "Subject name cannot exceed 150 characters."),

  code: z
    .string()
    .trim()
    .max(30, "Subject code cannot exceed 30 characters.")
    .optional()
    .or(z.literal("")),

  credits: z.coerce.number().min(0, "Credits cannot be negative."),

  description: z
    .string()
    .max(5000, "Description cannot exceed 5000 characters.")
    .optional()
    .or(z.literal("")),

  featured: z.boolean(),

  displayOrder: z.coerce.number().min(0, "Display order cannot be negative."),

  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]),
});
