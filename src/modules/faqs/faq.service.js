import FAQ from "./faq.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";

/**
 * Validate Scope
 */
const validateScope = (payload) => {
  const { scope, university, universityCourse } = payload;

  if (scope === "GLOBAL") {
    payload.university = null;
    payload.universityCourse = null;
  }

  if (scope === "UNIVERSITY") {
    if (!university) {
      throw new ApiError(400, "University is required.");
    }

    payload.universityCourse = null;
  }

  if (scope === "UNIVERSITY_COURSE") {
    if (!universityCourse) {
      throw new ApiError(400, "University Course is required.");
    }

    payload.university = null;
  }

  return payload;
};

/**
 * Create FAQ
 */
const createFaq = async (payload) => {
  const normalizedPayload = validateScope({
    ...payload,
    question: payload.question.trim(),
    answer: payload.answer.trim(),
  });

  const existingFAQ = await FAQ.findOne({
    scope: normalizedPayload.scope,
    university: normalizedPayload.university,
    universityCourse: normalizedPayload.universityCourse,
    question: normalizedPayload.question,
    isDeleted: false,
  });

  if (existingFAQ) {
    throw new ApiError(409, "FAQ already exists for the selected scope.");
  }

  return await FAQ.create(normalizedPayload);
};

/**
 * Get All FAQs
 */
const getFaqs = async ({
  page = 1,
  limit = 10,
  search = "",
  scope,
  university,
  universityCourse,
  category,
  status,
  featured,
  sortBy = "displayOrder",
  sortOrder = "asc",
}) => {
  const filter = {};

  if (search) {
    filter.$or = [
      {
        question: {
          $regex: search,
          $options: "i",
        },
      },
      {
        answer: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (scope) filter.scope = scope;

  if (university) filter.university = university;

  if (universityCourse) filter.universityCourse = universityCourse;

  if (category) filter.category = category;

  if (status) filter.status = status;

  if (featured !== undefined) filter.featured = featured;

  return await baseService.paginate(FAQ, filter, {
    page,
    limit,
    sortBy,
    sortOrder,

    populate: [
      {
        path: "university",
      },
      {
        path: "universityCourse",
        populate: [
          {
            path: "courseCatalog",
          },
          {
            path: "specialization",
          },
        ],
      },
    ],
  });
};

/**
 * Get FAQ By Id
 */
const getFaqById = async (id) => {
  return await baseService.findById(FAQ, id, [
    {
      path: "university",
    },
    {
      path: "universityCourse",
      populate: [
        {
          path: "courseCatalog",
        },
        {
          path: "specialization",
        },
      ],
    },
  ]);
};

/**
 * Update FAQ
 */
const updateFaq = async (id, payload) => {
  const faq = await baseService.findById(FAQ, id);

  const mergedPayload = validateScope({
    ...faq.toObject(),
    ...payload,
  });

  if (payload.question) {
    mergedPayload.question = payload.question.trim();
  }

  if (payload.answer) {
    mergedPayload.answer = payload.answer.trim();
  }

  const existingFAQ = await FAQ.findOne({
    scope: mergedPayload.scope,
    university: mergedPayload.university,
    universityCourse: mergedPayload.universityCourse,
    question: mergedPayload.question,

    _id: {
      $ne: id,
    },

    isDeleted: false,
  });

  if (existingFAQ) {
    throw new ApiError(409, "FAQ already exists for the selected scope.");
  }

  Object.assign(faq, mergedPayload);

  await faq.save();

  return faq;
};

/**
 * Delete FAQ
 */
const deleteFaq = async (id) => {
  await baseService.softDelete(FAQ, id);

  return null;
};

const faqService = {
  createFaq,
  getFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
};

export default faqService;
