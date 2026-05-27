


// CREATE PATIENT

import { patientModel } from "../Model/PatientSchema.js";

export const createPatient = async (
  req,
  res
) => {
  try {

    const {
      name,
      age,
      gender,
      disease,
      phone,
      address,
    } = req.body;

    const patient =
      await patientModel.create({
        name,
        age,
        gender,
        disease,
        phone,
        address,
      });

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// GET ALL PATIENTS

export const getPatients = async (
  req,
  res
) => {
  try {

    const patients =
      await patientModel.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      patients,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// GET SINGLE PATIENT

export const getSinglePatient = async (
  req,
  res
) => {
  try {

    const patient =
      await patientModel.findById(
        req.params.id
      );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// UPDATE PATIENT

export const updatePatient = async (
  req,
  res
) => {
  try {

    const patient =
      await patientModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// DELETE PATIENT

export const deletePatient = async (
  req,
  res
) => {
  try {

    const patient =
      await patientModel.findByIdAndDelete(
        req.params.id
      );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};