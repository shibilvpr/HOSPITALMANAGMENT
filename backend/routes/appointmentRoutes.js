import express from "express";

import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../Controller/appointmentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  createAppointment
);

router.get(
  "/all",
  protect,
  getAppointments
);

router.put(
  "/update/:id",
  protect,
  updateAppointment
);

router.delete(
  "/delete/:id",
  protect,
  deleteAppointment
);

export default router;
