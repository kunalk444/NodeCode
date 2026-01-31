import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "nodecode", // change if needed
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}
