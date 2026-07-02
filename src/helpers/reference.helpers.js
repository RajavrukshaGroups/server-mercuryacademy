import baseService from "../services/base.service.js";

/**
 * Validate multiple referenced documents.
 *
 * Example:
 * await validateReferences([
 *   { Model: Country, id: payload.country },
 *   { Model: State, id: payload.state },
 * ]);
 */
const validateReferences = async (references = []) => {
  const validatedDocuments = {};

  for (const reference of references) {
    const { Model, id, key } = reference;

    if (!id) continue;

    const document = await baseService.findById(Model, id);

    validatedDocuments[key || Model.modelName] = document;
  }

  return validatedDocuments;
};

export default validateReferences;
