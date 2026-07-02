import mongoose from "mongoose";
import { RECORD_STATUS } from "../constants/common.constants.js";

const baseFields = {
  featured: {
    type: Boolean,
    default: false,
  },

  displayOrder: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: RECORD_STATUS,
    default: RECORD_STATUS[0],
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  deletedAt: {
    type: Date,
    default: null,
  },
};

export default baseFields;
