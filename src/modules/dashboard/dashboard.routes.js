import { Router } from "express";

import dashboardController from "./dashboard.controller.js";

import authenticate from "../../middleware/authenticate.middleware.js";

const router = Router();

/**
 * Dashboard Overview
 */
router.get("/overview", authenticate, dashboardController.getOverview);
router.get(
  "/lead-statistics",
  authenticate,
  dashboardController.getLeadStatistics,
);
router.get("/recent-leads", authenticate, dashboardController.getRecentLeads);
router.get(
  "/recent-universities",
  authenticate,
  dashboardController.getRecentUniversities,
);
router.get("/recent-media", authenticate, dashboardController.getRecentMedia);
router.get("/monthly-leads", authenticate, dashboardController.getMonthlyLeads);
router.get(
  "/university-wise-leads",
  authenticate,
  dashboardController.getUniversityWiseLeads,
);

export default router;
