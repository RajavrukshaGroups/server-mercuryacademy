import asyncHandler from "../../utils/asyncHandler.js";

import universityCourseSubjectService from "./university-course-subject.service.js";

/**
 * Create
 */
const createUniversityCourseSubject = asyncHandler(async (req, res) => {
  const data =
    await universityCourseSubjectService.createUniversityCourseSubject(
      req.body,
    );

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "University course subject created successfully.",
    data,
  });
});

/**
 * List
 */
const getUniversityCourseSubjects = asyncHandler(async (req, res) => {
  const result =
    await universityCourseSubjectService.getUniversityCourseSubjects(req.query);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "University course subjects fetched successfully.",
    ...result,
  });
});

/**
 * Details
 */
const getUniversityCourseSubjectById = asyncHandler(async (req, res) => {
  const data =
    await universityCourseSubjectService.getUniversityCourseSubjectById(
      req.params.id,
    );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "University course subject fetched successfully.",
    data,
  });
});

/**
 * Update
 */
const updateUniversityCourseSubject = asyncHandler(async (req, res) => {
  const data =
    await universityCourseSubjectService.updateUniversityCourseSubject(
      req.params.id,
      req.body,
    );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "University course subject updated successfully.",
    data,
  });
});

/**
 * Delete
 */
const deleteUniversityCourseSubject = asyncHandler(async (req, res) => {
  await universityCourseSubjectService.deleteUniversityCourseSubject(
    req.params.id,
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "University course subject deleted successfully.",
  });
});

const universityCourseSubjectController = {
  createUniversityCourseSubject,
  getUniversityCourseSubjects,
  getUniversityCourseSubjectById,
  updateUniversityCourseSubject,
  deleteUniversityCourseSubject,
};

export default universityCourseSubjectController;
