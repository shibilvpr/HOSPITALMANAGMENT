import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },

    specialty: {
      type: String,
      required: [true, "Specialty is required"],
    },

    experience: {
      type: Number,
      required: [true, "Experience is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

export const doctorModel =
  mongoose.model(
    "doctors",
    doctorSchema
  );