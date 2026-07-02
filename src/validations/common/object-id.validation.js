import mongoose from "mongoose";
import { z } from "zod";

export const objectIdSchema = (fieldName = "Resource", required = true) => {
  const schema = z
    .string()
    .trim()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: `Invalid ${fieldName}.`,
    });

  return required
    ? schema.min(1, `${fieldName} is required.`)
    : schema.optional();
};
