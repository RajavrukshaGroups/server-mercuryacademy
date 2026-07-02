import { ZodError } from "zod";

import ApiError from "../utils/ApiError.js";

const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new ApiError(400, "Validation failed.", error.issues));
      }

      next(error);
    }
  };
};

export default validateRequest;
