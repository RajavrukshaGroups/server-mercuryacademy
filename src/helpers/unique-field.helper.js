import ApiError from "../utils/ApiError.js";

/**
 * Validate unique fields for create/update operations.
 *
 * @param {Object} options
 * @param {mongoose.Model} options.Model
 * @param {Object} options.fields
 * @param {String} [options.excludeId]
 */
const validateUniqueFields = async ({ Model, fields, excludeId = null }) => {
  for (const [field, config] of Object.entries(fields)) {
    const value =
      typeof config === "object" && config !== null ? config.value : config;

    const message =
      typeof config === "object" && config !== null
        ? config.message
        : `${Model.modelName} ${field} already exists.`;

    if (value === undefined || value === null || value === "") {
      continue;
    }

    const filter = {
      [field]: value,
      isDeleted: false,
    };

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    const exists = await Model.findOne(filter);

    if (exists) {
      throw new ApiError(409, message);
    }
  }
};

export default validateUniqueFields;
