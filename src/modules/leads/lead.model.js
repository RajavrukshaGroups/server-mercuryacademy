import mongoose from "mongoose";

import baseFields from "../../schemas/base.schema.js";

import { LEAD_STATUSES, LEAD_SOURCES } from "../../constants/lead.constants.js";

const leadSchema = new mongoose.Schema(
  {
    /**
     * Student First Name
     */
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    /**
     * Student Last Name
     */
    lastName: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    /**
     * Student Email
     */
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    /**
     * Student Phone Number
     */
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    /**
     * Interested University Course
     */
    universityCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UniversityCourse",
      required: true,
    },

    /**
     * Country
     */
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      default: null,
    },

    /**
     * State
     */
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      default: null,
    },

    /**
     * City
     */
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      default: null,
    },

    /**
     * Student Message
     */
    message: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    /**
     * Lead Source
     */
    source: {
      type: String,
      enum: LEAD_SOURCES,
      default: "Website",
    },

    /**
     * Lead Status
     */
    leadStatus: {
      type: String,
      enum: LEAD_STATUSES,
      default: "NEW",
    },

    /**
     * Preferred Callback Time
     */
    preferredCallbackTime: {
      type: String,
      trim: true,
    },

    /**
     * Next Follow-up Date
     */
    nextFollowUpDate: {
      type: Date,
      default: null,
    },

    /**
     * Counsellor Remarks
     */
    remarks: {
      type: String,
      trim: true,
      maxlength: 5000,
    },

    /**
     * Assigned Counsellor
     * (Will be connected with User module later)
     */
    // assignedTo: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   default: null,
    // },
    assignedTo: {
      type: String,
      trim: true,
    },

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

/**
 * Search Indexes
 */
leadSchema.index({
  email: 1,
});

leadSchema.index({
  phone: 1,
});

leadSchema.index({
  universityCourse: 1,
});

leadSchema.index({
  leadStatus: 1,
});

leadSchema.index({
  source: 1,
});

leadSchema.index({
  assignedTo: 1,
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
