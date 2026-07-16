import { Router } from "express";

import approvalRoutes from "../modules/approvals/approval.routes.js";
import courseCategoryRoutes from "../modules/course-category/course-category.routes.js";
import courseCatalogRoutes from "../modules/course-catalog/course-catalog.routes.js";
import universityRoutes from "../modules/university/university.routes.js";
import countryRoutes from "../modules/country/country.routes.js";
import stateRoutes from "../modules/state/state.routes.js";
import cityRoutes from "../modules/city/city.routes.js";
import mediaRoutes from "../modules/media/media.routes.js";
import specializationRoutes from "../modules/specialization/specialization.routes.js";
import universityCourseRoutes from "../modules/university-course/university-course.routes.js";
import universityCourseCurriculumRoutes from "../modules/university-course-curriculum/university-course-curriculum.routes.js";
import universityCourseSubjectRoutes from "../modules/university-course-subject/university-course-subject.routes.js";
import leadRoutes from "../modules/leads/lead.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import settingsRoutes from "../modules/settings/settings.routes.js";
import faqRoutes from "../modules/faqs/faq.routes.js";
import testimonialRoutes from "../modules/testimonials/testimonial.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Mercury Academy API is running successfully.",
    timestamp: new Date().toISOString(),
  });
});

router.use("/approvals", approvalRoutes);
router.use("/course-categories", courseCategoryRoutes);
router.use("/course-catalogs", courseCatalogRoutes);
router.use("/universities", universityRoutes);
router.use("/countries", countryRoutes);
router.use("/states", stateRoutes);
router.use("/cities", cityRoutes);
router.use("/media", mediaRoutes);
router.use("/specializations", specializationRoutes);
router.use("/university-courses", universityCourseRoutes);
router.use("/university-course-curriculums", universityCourseCurriculumRoutes);
router.use("/university-course-subjects", universityCourseSubjectRoutes);
router.use("/faqs", faqRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/leads", leadRoutes);
router.use("/settings", settingsRoutes);
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
