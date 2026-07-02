import mongoose from "mongoose";

import seoSchema from "../../schemas/seo.schema.js";
import baseFields from "../../schemas/base.schema.js";

const stateSchema = new mongoose.Schema(
  {
    /**
     * Karnataka
     */
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    /**
     * KA
     */
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 10,
    },

    /**
     * Parent Country
     */
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

    seo: seoSchema,

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

/**
 * Same state name cannot exist twice in the same country.
 */
stateSchema.index(
  {
    name: 1,
    country: 1,
  },
  {
    unique: true,
  },
);

/**
 * State code should be unique within a country.
 */
stateSchema.index(
  {
    code: 1,
    country: 1,
  },
  {
    unique: true,
  },
);

const State = mongoose.model("State", stateSchema);

export default State;
