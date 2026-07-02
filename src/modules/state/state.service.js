import State from "./state.model.js";
import Country from "../country/country.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";

/**
 * Create State
 */
const createState = async (payload) => {
  const normalizedPayload = {
    ...payload,
    name: payload.name.trim(),
    code: payload.code.trim().toUpperCase(),
  };

  // Validate Country
  //   await baseService.findById(Country, normalizedPayload.country);
  await validateReferences([
    {
      Model: Country,
      id: normalizedPayload.country,
    },
  ]);

  const existingState = await State.findOne({
    $or: [
      {
        name: normalizedPayload.name,
        country: normalizedPayload.country,
      },
      {
        code: normalizedPayload.code,
        country: normalizedPayload.country,
      },
    ],
    isDeleted: false,
  });

  if (
    existingState?.name === normalizedPayload.name &&
    existingState.country.toString() === normalizedPayload.country
  ) {
    throw new ApiError(409, "State name already exists for this country.");
  }

  if (
    existingState?.code === normalizedPayload.code &&
    existingState.country.toString() === normalizedPayload.country
  ) {
    throw new ApiError(409, "State code already exists for this country.");
  }

  return await State.create(normalizedPayload);
};

/**
 * Get States
 */
const getStates = async ({
  page = 1,
  limit = 10,
  search = "",
  country,
  status,
  featured,
  sortBy = "displayOrder",
  sortOrder = "asc",
}) => {
  const filter = {};

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        code: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (country) {
    filter.country = country;
  }

  if (status) {
    filter.status = status;
  }

  if (featured !== undefined) {
    filter.featured = featured;
  }

  return await baseService.paginate(State, filter, {
    page,
    limit,
    sortBy,
    sortOrder,
    populate: ["country"],
  });
};

/**
 * Get State By ID
 */
const getStateById = async (id) => {
  return await baseService.findById(State, id, ["country"]);
};

/**
 * Update State
 */
const updateState = async (id, payload) => {
  const state = await baseService.findById(State, id);

  const normalizedPayload = {
    ...payload,
  };

  const countryId = payload.country || state.country.toString();

  // Validate Country
  if (payload.country) {
    await baseService.findById(Country, payload.country);
  }

  if (payload.name) {
    normalizedPayload.name = payload.name.trim();

    const existingName = await State.findOne({
      name: normalizedPayload.name,
      country: countryId,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingName) {
      throw new ApiError(409, "State name already exists for this country.");
    }
  }

  if (payload.code) {
    normalizedPayload.code = payload.code.trim().toUpperCase();

    const existingCode = await State.findOne({
      code: normalizedPayload.code,
      country: countryId,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingCode) {
      throw new ApiError(409, "State code already exists for this country.");
    }
  }

  Object.assign(state, normalizedPayload);

  await state.save();

  return state;
};

/**
 * Delete State
 */
const deleteState = async (id) => {
  await baseService.softDelete(State, id);

  return null;
};

const stateService = {
  createState,
  getStates,
  getStateById,
  updateState,
  deleteState,
};

export default stateService;
