import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

/**
 * Build Pagination
 */
const buildPagination = ({ page = 1, limit = 10 }) => {
  //   const currentPage = Number(page);
  //   const currentLimit = Number(limit);
  const currentPage = Math.max(1, Number(page) || 1);
  const currentLimit = Math.max(1, Number(limit) || 10);

  return {
    page: currentPage,
    limit: currentLimit,
    skip: (currentPage - 1) * currentLimit,
  };
};

/**
 * Build Sort Object
 */
const buildSort = ({ sortBy = "displayOrder", sortOrder = "asc" } = {}) => ({
  [sortBy]: sortOrder === "desc" ? -1 : 1,
});

/**
 * Find Document By ID
 */
const findById = async (Model, id, populate = []) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid resource id.");
  }
  let query = Model.findOne({
    _id: id,
    isDeleted: false,
  });

  populate.forEach((field) => {
    query = query.populate(field);
  });

  const document = await query;

  if (!document) {
    throw new ApiError(404, `${Model.modelName} not found.`);
  }

  return document;
};

/**
 * Soft Delete
 */
const softDelete = async (Model, id) => {
  const document = await findById(Model, id);

  document.set({
    isDeleted: true,
    deletedAt: new Date(),
  });

  await document.save();

  return;
};

/**
 * Generic Pagination
 */
const paginate = async (Model, filter = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "displayOrder",
    sortOrder = "asc",
    populate = [],
  } = options;

  //   const { skip } = buildPagination({
  //     page,
  //     limit,
  //   });

  const pagination = buildPagination({
    page,
    limit,
  });

  const { skip, page: currentPage, limit: currentLimit } = pagination;

  const sort = buildSort({
    sortBy,
    sortOrder,
  });

  let query = Model.find({
    isDeleted: false,
    ...filter,
  }).lean();

  populate.forEach((field) => {
    query = query.populate(field);
  });

  query = query.sort(sort).skip(skip).limit(currentLimit);
  const [data, total] = await Promise.all([
    query,
    Model.countDocuments({
      ...filter,
      isDeleted: false,
    }),
  ]);

  const totalPages = Math.ceil(total / currentLimit);

  return {
    data,
    meta: {
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages,
    },
  };
};

const baseService = {
  buildPagination,
  buildSort,
  findById,
  softDelete,
  paginate,
};

export default baseService;
