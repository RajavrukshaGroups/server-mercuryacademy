import Country from "./country.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";

/**
 * Create Country
 */
const createCountry = async (payload) => {
  const normalizedPayload = {
    ...payload,
    name: payload.name.trim(),
    iso2Code: payload.iso2Code.trim().toUpperCase(),
    iso3Code: payload.iso3Code.trim().toUpperCase(),
    phoneCode: payload.phoneCode.trim(),
  };

  const existingCountry = await Country.findOne({
    $or: [
      { name: normalizedPayload.name },
      { iso2Code: normalizedPayload.iso2Code },
      { iso3Code: normalizedPayload.iso3Code },
    ],
    isDeleted: false,
  });

  if (existingCountry?.name === normalizedPayload.name) {
    throw new ApiError(409, "Country name already exists.");
  }

  if (existingCountry?.iso2Code === normalizedPayload.iso2Code) {
    throw new ApiError(409, "ISO2 code already exists.");
  }

  if (existingCountry?.iso3Code === normalizedPayload.iso3Code) {
    throw new ApiError(409, "ISO3 code already exists.");
  }

  return await Country.create(normalizedPayload);
};

/**
 * Get Countries
 */
const getCountries = async ({
  page = 1,
  limit = 10,
  search = "",
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
        iso2Code: {
          $regex: search,
          $options: "i",
        },
      },
      {
        iso3Code: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (status) {
    filter.status = status;
  }

  if (featured !== undefined && featured !== "") {
    filter.featured = featured === "true";
  }

  return await baseService.paginate(Country, filter, {
    page,
    limit,
    sortBy,
    sortOrder,
  });
};

/**
 * Get Country By ID
 */
const getCountryById = async (id) => {
  return await baseService.findById(Country, id);
};

/**
 * Update Country
 */
const updateCountry = async (id, payload) => {
  const country = await baseService.findById(Country, id);

  const normalizedPayload = {
    ...payload,
  };

  if (payload.name) {
    normalizedPayload.name = payload.name.trim();

    const existingName = await Country.findOne({
      name: normalizedPayload.name,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingName) {
      throw new ApiError(409, "Country name already exists.");
    }
  }

  if (payload.iso2Code) {
    normalizedPayload.iso2Code = payload.iso2Code.trim().toUpperCase();

    const existingIso2 = await Country.findOne({
      iso2Code: normalizedPayload.iso2Code,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingIso2) {
      throw new ApiError(409, "ISO2 code already exists.");
    }
  }

  if (payload.iso3Code) {
    normalizedPayload.iso3Code = payload.iso3Code.trim().toUpperCase();

    const existingIso3 = await Country.findOne({
      iso3Code: normalizedPayload.iso3Code,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingIso3) {
      throw new ApiError(409, "ISO3 code already exists.");
    }
  }

  if (payload.phoneCode) {
    normalizedPayload.phoneCode = payload.phoneCode.trim();
  }

  Object.assign(country, normalizedPayload);

  await country.save();

  return country;
};

/**
 * Delete Country
 */
const deleteCountry = async (id) => {
  await baseService.softDelete(Country, id);

  return null;
};

const countryService = {
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
};

export default countryService;
