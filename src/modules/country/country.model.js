import mongoose from "mongoose";

import seoSchema from "../../schemas/seo.schema.js";
import baseFields from "../../schemas/base.schema.js";

const countrySchema = new mongoose.Schema(
  {
    /**
     * India
     */
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    /**
     * IN
     */
    iso2Code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 2,
    },

    /**
     * IND
     */
    iso3Code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 3,
      maxlength: 3,
    },

    /**
     * +91
     */
    phoneCode: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
    },

    /**
     * Country Flag
     */
    flag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    seo: seoSchema,

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

countrySchema.index(
  {
    name: 1,
  },
  {
    unique: true,
  },
);

countrySchema.index(
  {
    iso2Code: 1,
  },
  {
    unique: true,
  },
);

countrySchema.index(
  {
    iso3Code: 1,
  },
  {
    unique: true,
  },
);

const Country = mongoose.model("Country", countrySchema);

export default Country;
