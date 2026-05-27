import mongoose from "mongoose";

const appointmentSchema =
  new mongoose.Schema(
    {
      patient: {
        type: String,
        required: true,
        trim: true,
      },

      doctor: {
        type: String,
        required: true,
        trim: true,
      },

      date: {
        type: Date,
        required: true,
      },

      status: {
        type: String,

        enum: [
          "Confirmed",
          "Pending",
          "Cancelled",
        ],

        default: "Confirmed",
      },
    },

    {
      timestamps: true,
    }
  );

export const appointmentModel = mongoose.model("appointments",appointmentSchema);