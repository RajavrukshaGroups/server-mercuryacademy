import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import approvalService from "./approval.service.js";

const createApproval = asyncHandler(async (req, res) => {
  const approval = await approvalService.createApproval(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "Approval created successfully.", approval));
});

const getApprovals = asyncHandler(async (req, res) => {
  const result = await approvalService.getApprovals(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Approvals fetched successfully.",
        result.data,
        result.meta,
      ),
    );
});

const getApprovalById = asyncHandler(async (req, res) => {
  const approval = await approvalService.getApprovalById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Approval fetched successfully.", approval));
});

const updateApproval = asyncHandler(async (req, res) => {
  const approval = await approvalService.updateApproval(
    req.params.id,
    req.body,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Approval updated successfully.", approval));
});

const deleteApproval = asyncHandler(async (req, res) => {
  await approvalService.deleteApproval(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Approval deleted successfully."));
});

const approvalController = {
  createApproval,
  getApprovals,
  getApprovalById,
  updateApproval,
  deleteApproval,
};

export default approvalController;
