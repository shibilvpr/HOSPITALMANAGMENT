import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Gender is required"],
    },

    disease: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    address: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const patientModel = mongoose.model(
  "patients",
  patientSchema
);