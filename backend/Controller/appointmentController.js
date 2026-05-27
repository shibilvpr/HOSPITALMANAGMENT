import { appointmentModel } from "../Model/AppointmentSchema.js";



export const createAppointment =
  async (req, res) => {

    try {
      if (req.user && req.user.role === "doctor") {
        return res.status(403).json({
          success: false,
          message: "Doctors are not authorized to create appointments",
        });
      }

      const {
        patient,
        doctor,
        date,
        status,
      } = req.body;

      if (
        !patient ||
        !doctor ||
        !date
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All fields are required",
        });
      }

      const newAppointment =
        await appointmentModel.create({
          patient,
          doctor,
          date,
          status,
        });

      res.status(201).json({
        success: true,
        message:
          "Appointment created successfully",
        appointment:
          newAppointment,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// GET ALL APPOINTMENTS

export const getAppointments =
  async (req, res) => {

    try {
      let query = {};
      if (req.user && req.user.role === "doctor") {
        query = { doctor: req.user.name };
      }

      const appointments =
        await appointmentModel.find(query)
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        appointments,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// GET SINGLE APPOINTMENT

export const getSingleAppointment =
  async (req, res) => {

    try {

      const appointment =
        await appointmentModel.findById(
          req.params.id
        );

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message:
            "Appointment not found",
        });
      }

      res.status(200).json({
        success: true,
        appointment,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// UPDATE APPOINTMENT

export const updateAppointment =
  async (req, res) => {

    try {
      let updatePayload = req.body;

      if (req.user && req.user.role === "doctor") {
        const { status } = req.body;
        if (!status) {
          return res.status(400).json({
            success: false,
            message: "Status field is required for doctor status update",
          });
        }
        updatePayload = { status };
      }

      const updatedAppointment =
        await appointmentModel.findByIdAndUpdate(
          req.params.id,
          updatePayload,
          {
            new: true,
          }
        );

      if (!updatedAppointment) {
        return res.status(404).json({
          success: false,
          message:
            "Appointment not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Appointment updated successfully",
        appointment:
          updatedAppointment,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// DELETE APPOINTMENT


export const deleteAppointment =
  async (req, res) => {

    try {
      if (req.user && req.user.role === "doctor") {
        return res.status(403).json({
          success: false,
          message: "Doctors are not authorized to delete appointments",
        });
      }

      const deletedAppointment =
        await appointmentModel.findByIdAndDelete(
          req.params.id
        );

      if (!deletedAppointment) {
        return res.status(404).json({
          success: false,
          message:
            "Appointment not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Appointment deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };