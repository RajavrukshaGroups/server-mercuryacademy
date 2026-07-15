import Approval from "./approval.model.js";
import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";

const createApproval = async (payload) => {
  const normalizedPayload = {
    ...payload,
    name: payload.name.trim(),
    shortName: payload.shortName.trim().toUpperCase(),
  };

  const existingApproval = await Approval.findOne({
    $or: [
      { name: normalizedPayload.name },
      { shortName: normalizedPayload.shortName },
    ],
    isDeleted: false,
  });

  if (existingApproval?.name === normalizedPayload.name) {
    throw new ApiError(409, "Approval name already exists.");
  }

  if (existingApproval?.shortName === normalizedPayload.shortName) {
    throw new ApiError(409, "Approval short name already exists.");
  }

  const approval = await Approval.create(normalizedPayload);
  return approval;
};

const getApprovals = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
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
        shortName: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (status) {
    filter.status = status;
  }

  return await baseService.paginate(Approval, filter, {
    page,
    limit,
    sortBy,
    sortOrder,
  });
};

const getApprovalById = async (id) => {
  return await baseService.findById(Approval, id, ["logo"]);
};

const updateApproval = async (id, payload) => {
  //   const approval = await Approval.findOne({
  //     _id: id,
  //     isDeleted: false,
  //   });
  const approval = await baseService.findById(Approval, id);

  //   if (!approval) {
  //     throw new ApiError(404, "Approval not found.");
  //   }

  const normalizedPayload = {
    ...payload,
  };

  if (payload.name) {
    normalizedPayload.name = payload.name.trim();

    const existingName = await Approval.findOne({
      name: normalizedPayload.name,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingName) {
      throw new ApiError(409, "Approval name already exists.");
    }
  }

  if (payload.shortName) {
    normalizedPayload.shortName = payload.shortName.trim().toUpperCase();

    const existingShortName = await Approval.findOne({
      shortName: normalizedPayload.shortName,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingShortName) {
      throw new ApiError(409, "Approval short name already exists.");
    }
  }

  Object.assign(approval, normalizedPayload);

  await approval.save();

  return approval;
};

const deleteApproval = async (id) => {
  await baseService.softDelete(Approval, id);

  return null;
};

const approvalService = {
  createApproval,
  getApprovals,
  getApprovalById,
  updateApproval,
  deleteApproval,
};

export default approvalService;
