import mongoose from "mongoose";

import seoSchema from "../../schemas/seo.schema.js";
import baseFields from "../../schemas/base.schema.js";

const citySchema = new mongoose.Schema(
  {
    /**
     * Bangalore
     */
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    /**
     * Parent Country
     */
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

    /**
     * Parent State
     */
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
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
 * City name should be unique within a state.
 */
citySchema.index(
  {
    name: 1,
    state: 1,
  },
  {
    unique: true,
  },
);

/**
 * Useful for searching by hierarchy.
 */
citySchema.index({
  country: 1,
  state: 1,
});

const City = mongoose.model("City", citySchema);

export default City;
