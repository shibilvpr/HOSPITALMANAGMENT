import bcrypt from "bcryptjs";
import { userModel } from "../Model/userSchema.js";

// CREATE RECEPTIONIST / USER
export const createReceptionist = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || "receptionist",
    });

    const { password: _, ...userData } = user._doc;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      receptionist: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL RECEPTIONISTS / USERS (EXCLUDING DOCTORS)
export const getReceptionists = async (req, res) => {
  try {
    const receptionists = await userModel.find({ role: { $ne: "doctor" } }).select("-password");
    res.status(200).json({
      success: true,
      receptionists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE RECEPTIONIST / USER
export const updateReceptionist = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.params.id, role: { $ne: "doctor" } },
      { name, email, role },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      receptionist: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE RECEPTIONIST / USER

export const deleteReceptionist = async (req, res) => {
  try {
    const deletedUser = await userModel.findOneAndDelete({
      _id: req.params.id,
      role: { $ne: "doctor" },
    });

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
