import City from "./city.model.js";
import Country from "../country/country.model.js";
import State from "../state/state.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";

import validateReferences from "../../helpers/reference.helpers.js";

/**
 * Create City
 */
const createCity = async (payload) => {
  const normalizedPayload = {
    ...payload,
    name: payload.name.trim(),
  };

  // Validate Country

  const { state } = await validateReferences([
    {
      Model: Country,
      id: normalizedPayload.country,
      key: "country",
    },
    {
      Model: State,
      id: normalizedPayload.state,
      key: "state",
    },
  ]);

  // Ensure State belongs to Country
  if (state.country.toString() !== normalizedPayload.country) {
    throw new ApiError(
      400,
      "Selected state does not belong to the selected country.",
    );
  }

  // Duplicate Check
  const existingCity = await City.findOne({
    name: normalizedPayload.name,
    state: normalizedPayload.state,
    isDeleted: false,
  });

  if (existingCity) {
    throw new ApiError(409, "City already exists for this state.");
  }

  return await City.create(normalizedPayload);
};

/**
 * Get Cities
 */
const getCities = async ({
  page = 1,
  limit = 10,
  search = "",
  country,
  state,
  status,
  featured,
  sortBy = "displayOrder",
  sortOrder = "asc",
}) => {
  const filter = {};

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (country) {
    filter.country = country;
  }

  if (state) {
    filter.state = state;
  }

  if (status) {
    filter.status = status;
  }

  if (featured !== undefined) {
    filter.featured = featured;
  }

  return await baseService.paginate(City, filter, {
    page,
    limit,
    sortBy,
    sortOrder,
    populate: ["country", "state"],
  });
};

/**
 * Get City By ID
 */
const getCityById = async (id) => {
  return await baseService.findById(City, id, ["country", "state"]);
};

/**
 * Update City
 */
const updateCity = async (id, payload) => {
  const city = await baseService.findById(City, id);

  const normalizedPayload = {
    ...payload,
  };

  const countryId = payload.country || city.country.toString();
  const stateId = payload.state || city.state.toString();

  // Validate Country
  const { state: stateDocument } = await validateReferences([
    {
      Model: Country,
      id: countryId,
      key: "country",
    },
    {
      Model: State,
      id: stateId,
      key: "state",
    },
  ]);

  // Ensure State belongs to Country
  if (stateDocument.country.toString() !== countryId) {
    throw new ApiError(
      400,
      "Selected state does not belong to the selected country.",
    );
  }

  if (payload.name) {
    normalizedPayload.name = payload.name.trim();

    const existingCity = await City.findOne({
      name: normalizedPayload.name,
      state: stateId,
      _id: {
        $ne: id,
      },
      isDeleted: false,
    });

    if (existingCity) {
      throw new ApiError(409, "City already exists for this state.");
    }
  }

  Object.assign(city, normalizedPayload);

  await city.save();

  return city;
};

/**
 * Delete City
 */
const deleteCity = async (id) => {
  await baseService.softDelete(City, id);

  return null;
};

const cityService = {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
};

export default cityService;
