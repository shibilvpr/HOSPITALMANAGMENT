

import { doctorModel } from "../Model/DoctorSchema.js";
import { userModel } from "../Model/userSchema.js";
import bcrypt from "bcryptjs";

export const createDoctor =
  async (req, res) => {

    try {

      const {
        name,
        specialty,
        experience,
        phone,
        email,
        password,
      } = req.body;

      if (
        !name ||
        !specialty ||
        !experience ||
        !phone ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All fields are required",
        });
      }

      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "A user with this email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create User Login
      const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
        role: "doctor",
      });

      // Create Doctor Profile
      const newDoctor =
        await doctorModel.create({
          name,
          specialty,
          experience,
          phone,
          email,
        });

      res.status(201).json({
        success: true,
        message:
          "Doctor added successfully",
        doctor: newDoctor,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// GET ALL DOCTORS

export const getDoctors =
  async (req, res) => {

    try {

      const doctors =
        await doctorModel.find()
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        doctors,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// GET SINGLE DOCTOR

export const getSingleDoctor =
  async (req, res) => {

    try {

      const doctor =
        await doctorModel.findById(
          req.params.id
        );

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message:
            "Doctor not found",
        });
      }

      res.status(200).json({
        success: true,
        doctor,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// UPDATE DOCTOR

export const updateDoctor =
  async (req, res) => {

    try {

      const updatedDoctor =
        await doctorModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      if (!updatedDoctor) {
        return res.status(404).json({
          success: false,
          message:
            "Doctor not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Doctor updated successfully",
        doctor: updatedDoctor,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// DELETE DOCTOR

export const deleteDoctor =
  async (req, res) => {

    try {

      const doctor = await doctorModel.findById(req.params.id);

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message:
            "Doctor not found",
        });
      }

      // Delete associated user
      await userModel.findOneAndDelete({ email: doctor.email });

      await doctorModel.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message:
          "Doctor deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };