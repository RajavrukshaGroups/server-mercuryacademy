import mongoose from "mongoose";

import baseFields from "../../schemas/base.schema.js";

const approvalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    shortName: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      maxlength: 20,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    logo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },

    websiteUrl: {
      type: String,
      trim: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

approvalSchema.index({ name: 1 }, { unique: true });

approvalSchema.index({ shortName: 1 }, { unique: true });

approvalSchema.index({
  displayOrder: 1,
});

const Approval = mongoose.model("Approval", approvalSchema);

export default Approval;
