import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import dashboardService from "./dashboard.service.js";

/**
 * Dashboard Overview
 */
const getOverview = asyncHandler(async (req, res) => {
  const overview = await dashboardService.getOverview();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Dashboard overview fetched successfully.",
        overview,
      ),
    );
});

/**
 * Lead Statistics
 */
const getLeadStatistics = asyncHandler(async (req, res) => {
  const statistics = await dashboardService.getLeadStatistics();

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Lead statistics fetched successfully.", statistics),
    );
});

/**
 * Recent Leads
 */
const getRecentLeads = asyncHandler(async (req, res) => {
  const recentLeads = await dashboardService.getRecentLeads();

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Recent leads fetched successfully.", recentLeads),
    );
});

/**
 * Recent Universities
 */
const getRecentUniversities = asyncHandler(async (req, res) => {
  const universities = await dashboardService.getRecentUniversities();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Recent universities fetched successfully.",
        universities,
      ),
    );
});

/**
 * Recent Media
 */
const getRecentMedia = asyncHandler(async (req, res) => {
  const media = await dashboardService.getRecentMedia();

  return res
    .status(200)
    .json(new ApiResponse(200, "Recent media fetched successfully.", media));
});

/**
 * Monthly Lead Analytics
 */
const getMonthlyLeads = asyncHandler(async (req, res) => {
  const analytics = await dashboardService.getMonthlyLeads();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Monthly lead analytics fetched successfully.",
        analytics,
      ),
    );
});

/**
 * University-wise Lead Analytics
 */
const getUniversityWiseLeads = asyncHandler(async (req, res) => {
  const analytics = await dashboardService.getUniversityWiseLeads();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "University-wise lead analytics fetched successfully.",
        analytics,
      ),
    );
});

const dashboardController = {
  getOverview,
  getLeadStatistics,
  getRecentLeads,
  getRecentUniversities,
  getRecentMedia,
  getMonthlyLeads,
  getUniversityWiseLeads,
};

export default dashboardController;
