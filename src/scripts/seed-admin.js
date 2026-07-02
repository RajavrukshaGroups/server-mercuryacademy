import mongoose from "mongoose";

import connectDB from "../config/db.js";

import User from "../modules/users/user.model.js";

import { hashPassword } from "../utils/password.js";

const seedAdmin = async () => {
  try {
    await connectDB();

    /**
     * Check if admin already exists
     */
    const existingAdmin = await User.findOne();

    if (existingAdmin) {
      console.log("⚠️ Admin already exists.");

      await mongoose.connection.close();

      process.exit(0);
    }

    /**
     * Hash Password
     */
    const hashedPassword = await hashPassword("Admin@123");

    /**
     * Create Admin
     */
    const admin = await User.create({
      firstName: "Mercury",
      lastName: "Admin",
      email: "admin@mercuryacademy.com",
      phone: "9886202952",
      password: hashedPassword,

      status: "PUBLISHED",
    });

    console.log("✅ Admin created successfully.");
    console.log({
      id: admin._id,
      email: admin.email,
    });

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed admin.");
    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedAdmin();