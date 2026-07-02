import mongoose from "mongoose";

import baseFields from "../../schemas/base.schema.js";

const userSchema = new mongoose.Schema(
  {
    /**
     * First Name
     */
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    /**
     * Last Name
     */
    lastName: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    /**
     * Email
     */
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 150,
    },

    /**
     * Phone
     */
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 20,
    },

    /**
     * Password (Hashed)
     */
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    /**
     * Profile Image
     */
    profileImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },

    /**
     * Last Login
     */
    lastLogin: {
      type: Date,
      default: null,
    },

    /**
     * Password Changed At
     */
    passwordChangedAt: {
      type: Date,
      default: null,
    },

    /**
     * Refresh Token
     */
    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    ...baseFields,
  },
  {
    timestamps: true,
  },
);

/**
 * Indexes
 */
// userSchema.index({
//   email: 1,
// });

// userSchema.index({
//   phone: 1,
// });

const User = mongoose.model("User", userSchema);

export default User;
