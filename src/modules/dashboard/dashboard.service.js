import University from "../university/university.model.js";
import CourseCatalog from "../course-catalog/course-catalog.model.js";
import Specialization from "../specialization/specialization.model.js";
import UniversityCourse from "../university-course/university-course.model.js";
import Lead from "../leads/lead.model.js";
import Media from "../media/media.model.js";
import { LEAD_STATUSES } from "../../constants/lead.constants.js";

/**
 * Dashboard Overview
 */
const getOverview = async () => {
  const [
    totalUniversities,
    totalCourses,
    totalSpecializations,
    totalUniversityCourses,
    totalLeads,
    totalMedia,
  ] = await Promise.all([
    University.countDocuments({
      isDeleted: false,
    }),

    CourseCatalog.countDocuments({
      isDeleted: false,
    }),

    Specialization.countDocuments({
      isDeleted: false,
    }),

    UniversityCourse.countDocuments({
      isDeleted: false,
    }),

    Lead.countDocuments({
      isDeleted: false,
    }),

    Media.countDocuments({
      isDeleted: false,
    }),
  ]);

  return {
    totalUniversities,
    totalCourses,
    totalSpecializations,
    totalUniversityCourses,
    totalLeads,
    totalMedia,
  };
};

/**
 * Lead Statistics
 */
const getLeadStatistics = async () => {
  const statistics = await Lead.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$leadStatus",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
  ]);

  return LEAD_STATUSES.map((status) => {
    const item = statistics.find((s) => s.status === status);

    return {
      status,
      count: item ? item.count : 0,
    };
  });
};

/**
 * Recent Leads
 */
const getRecentLeads = async () => {
  return await Lead.find({
    isDeleted: false,
  })
    .select(
      "firstName lastName email phone leadStatus createdAt universityCourse",
    )
    .populate({
      path: "universityCourse",
      populate: [
        {
          path: "university",
          select: "name shortName",
        },
        {
          path: "courseCatalog",
          select: "name shortName",
        },
        {
          path: "specialization",
          select: "name",
        },
      ],
    })
    .sort({
      createdAt: -1,
    })
    .limit(10)
    .lean();
};

/**
 * Recent Universities
 */
const getRecentUniversities = async () => {
  return await University.find({
    isDeleted: false,
  })
    .select("name shortName code universityType status featured createdAt")
    .populate("approvals", "name shortName")
    .populate("country", "name")
    .populate("state", "name")
    .populate("city", "name")
    .sort({
      createdAt: -1,
    })
    .limit(10)
    .lean();
};

/**
 * Recent Media
 */
const getRecentMedia = async () => {
  return await Media.find({
    isDeleted: false,
  })
    .select("originalName url folder mimeType resourceType size createdAt")
    .sort({
      createdAt: -1,
    })
    .limit(10)
    .lean();
};

/**
 * Monthly Lead Analytics (Last 12 Months)
 */
const getMonthlyLeads = async () => {
  const currentDate = new Date();

  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 11,
    1,
  );

  const analytics = await Lead.aggregate([
    {
      $match: {
        isDeleted: false,
        createdAt: {
          $gte: startDate,
        },
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const result = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1,
    );

    const year = date.getFullYear();
    const monthNumber = date.getMonth() + 1;

    const existing = analytics.find(
      (item) => item._id.year === year && item._id.month === monthNumber,
    );

    result.push({
      year,
      monthNumber,
      month: date.toLocaleString("default", {
        month: "short",
      }),
      count: existing?.count ?? 0,
    });
  }

  return result;
};

/**
 * University-wise Lead Analytics
 */
const getUniversityWiseLeads = async () => {
  return await Lead.aggregate([
    /**
     * Ignore deleted leads
     */
    {
      $match: {
        isDeleted: false,
      },
    },

    /**
     * Join UniversityCourse
     */
    {
      $lookup: {
        from: "universitycourses",
        localField: "universityCourse",
        foreignField: "_id",
        as: "course",
      },
    },

    {
      $unwind: "$course",
    },

    /**
     * Join University
     */
    {
      $lookup: {
        from: "universities",
        localField: "course.university",
        foreignField: "_id",
        as: "university",
      },
    },

    {
      $unwind: "$university",
    },

    /**
     * Group by University
     */
    {
      $group: {
        _id: "$university._id",

        university: {
          $first: "$university.name",
        },

        count: {
          $sum: 1,
        },
      },
    },

    /**
     * Sort Highest First
     */
    {
      $sort: {
        count: -1,
      },
    },

    /**
     * Format Response
     */
    {
      $project: {
        _id: 0,
        universityId: "$_id",
        university: 1,
        count: 1,
      },
    },
  ]);
};

const dashboardService = {
  getOverview,
  getLeadStatistics,
  getRecentLeads,
  getRecentUniversities,
  getRecentMedia,
  getMonthlyLeads,
  getUniversityWiseLeads,
};

export default dashboardService;
