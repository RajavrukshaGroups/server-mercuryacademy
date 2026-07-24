import University from "../university/university.model.js";
import UniversityCourse from "../university-course/university-course.model.js";

const PUBLIC_RECORD_FILTER = {
  status: "PUBLISHED",
  isDeleted: false,
};

/**
 * Get a published university and its published courses by slug.
 *
 * GET /api/v1/public/universities/:slug
 */
export const getPublicUniversityBySlug = async (slug) => {
  const normalizedSlug = slug.trim().toLowerCase();

  /**
   * Fetch published university details.
   */
  const university = await University.findOne({
    slug: normalizedSlug,
    ...PUBLIC_RECORD_FILTER,
  })
    .select(
      [
        "name",
        "shortName",
        "code",
        "slug",
        "establishedYear",
        "universityType",
        "websiteUrl",
        "email",
        "phone",
        "country",
        "state",
        "city",
        "address",
        "googleMapUrl",
        "logo",
        "banner",
        "thumbnail",
        "gallery",
        "overview",
        "vision",
        "mission",
        "approvals",
        "seo",
        "featured",
        "displayOrder",
        "createdAt",
        "updatedAt",
      ].join(" "),
    )
    .populate({
      path: "country",
      select: "name code",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "state",
      select: "name code",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "city",
      select: "name",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "logo",
      select: "url altText caption width height mimeType",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "banner",
      select: "url altText caption width height mimeType",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "thumbnail",
      select: "url altText caption width height mimeType",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "gallery",
      select: "url altText caption width height mimeType",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "approvals",
      match: PUBLIC_RECORD_FILTER,
    })
    .lean();

  if (!university) {
    return null;
  }

  /**
   * Fetch published courses belonging to this university.
   */
  const universityCourses = await UniversityCourse.find({
    university: university._id,
    ...PUBLIC_RECORD_FILTER,
  })
    .select(
      [
        "university",
        "courseCatalog",
        "specialization",
        "slug",
        "duration",
        "durationUnit",
        "eligibility",
        "admissionProcess",
        "admissionMode",
        "overview",
        "applicationFee",
        "semesterFee",
        "annualFee",
        "totalFee",
        "currency",
        "studyMode",
        "degreeAwarded",
        "brochure",
        "thumbnail",
        "banner",
        "applicationUrl",
        "seo",
        "featured",
        "displayOrder",
        "createdAt",
        "updatedAt",
      ].join(" "),
    )
    .populate({
      path: "courseCatalog",
      select:
        "name shortName code slug category level degreeType duration durationUnit overview icon seo",
      match: PUBLIC_RECORD_FILTER,
      populate: [
        {
          path: "category",
          match: PUBLIC_RECORD_FILTER,
        },
        {
          path: "icon",
          select: "url altText caption width height mimeType",
          match: {
            isDeleted: false,
          },
        },
      ],
    })
    .populate({
      path: "specialization",
      match: PUBLIC_RECORD_FILTER,
    })
    .populate({
      path: "brochure",
      select:
        "url originalName fileName mimeType extension size altText caption",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "thumbnail",
      select: "url altText caption width height mimeType",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "banner",
      select: "url altText caption width height mimeType",
      match: {
        isDeleted: false,
      },
    })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  /*
   * A populated courseCatalog becomes null when it is not published.
   * Remove such university courses from the public response.
   */
  const publishedCourses = universityCourses.filter(
    (course) => course.courseCatalog !== null,
  );

  return {
    ...university,
    courses: publishedCourses,
    totalCourses: publishedCourses.length,
  };
};

/**
 * Get one published university course using university slug and course slug.
 *
 * GET /api/v1/public/universities/:universitySlug/courses/:courseSlug
 */
export const getPublicUniversityCourseBySlug = async (
  universitySlug,
  courseSlug,
) => {
  const normalizedUniversitySlug = universitySlug.trim().toLowerCase();
  const normalizedCourseSlug = courseSlug.trim().toLowerCase();

  /**
   * First verify that the university is published.
   */
  const university = await University.findOne({
    slug: normalizedUniversitySlug,
    ...PUBLIC_RECORD_FILTER,
  })
    .select(
      [
        "name",
        "shortName",
        "code",
        "slug",
        "establishedYear",
        "universityType",
        "websiteUrl",
        "email",
        "phone",
        "country",
        "state",
        "city",
        "address",
        "googleMapUrl",
        "logo",
        "banner",
        "thumbnail",
        "approvals",
        "seo",
        "featured",
      ].join(" "),
    )
    .populate({
      path: "country",
      select: "name code",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "state",
      select: "name code",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "city",
      select: "name",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "logo",
      select: "url altText caption width height mimeType",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "banner",
      select: "url altText caption width height mimeType",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "thumbnail",
      select: "url altText caption width height mimeType",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "approvals",
      match: PUBLIC_RECORD_FILTER,
    })
    .lean();

  if (!university) {
    return null;
  }

  /**
   * Find the published course belonging to this university.
   */
  const universityCourse = await UniversityCourse.findOne({
    university: university._id,
    slug: normalizedCourseSlug,
    ...PUBLIC_RECORD_FILTER,
  })
    .select(
      [
        "university",
        "courseCatalog",
        "specialization",
        "slug",
        "duration",
        "durationUnit",
        "eligibility",
        "admissionProcess",
        "admissionMode",
        "overview",
        "applicationFee",
        "semesterFee",
        "annualFee",
        "totalFee",
        "currency",
        "studyMode",
        "degreeAwarded",
        "brochure",
        "thumbnail",
        "banner",
        "applicationUrl",
        "seo",
        "featured",
        "displayOrder",
        "createdAt",
        "updatedAt",
      ].join(" "),
    )
    .populate({
      path: "courseCatalog",
      select:
        "name shortName code slug category level degreeType duration durationUnit overview icon seo",
      match: PUBLIC_RECORD_FILTER,
      populate: [
        {
          path: "category",
          match: PUBLIC_RECORD_FILTER,
        },
        {
          path: "icon",
          select: "url altText caption width height mimeType",
          match: {
            isDeleted: false,
          },
        },
      ],
    })
    .populate({
      path: "specialization",
      match: PUBLIC_RECORD_FILTER,
      populate: {
        path: "icon",
        select: "url altText caption width height mimeType",
        match: {
          isDeleted: false,
        },
      },
    })
    .populate({
      path: "brochure",
      select:
        "url originalName fileName mimeType extension size altText caption",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "thumbnail",
      select: "url altText caption width height mimeType",
      match: {
        isDeleted: false,
      },
    })
    .populate({
      path: "banner",
      select: "url altText caption width height mimeType",
      match: {
        isDeleted: false,
      },
    })
    .lean();

  /*
   * Population returns null when the related course catalog is
   * unpublished or deleted. Such a course must not be public.
   */
  if (!universityCourse || !universityCourse.courseCatalog) {
    return null;
  }

  /*
   * If the course has a specialization reference but that specialization
   * is unpublished or deleted, prevent the record from being public.
   */
  if (
    universityCourse.specialization === null &&
    universityCourse.specialization !== undefined
  ) {
    const originalCourse = await UniversityCourse.findById(universityCourse._id)
      .select("specialization")
      .lean();

    if (originalCourse?.specialization) {
      return null;
    }
  }

  return {
    university,
    course: universityCourse,
  };
};
