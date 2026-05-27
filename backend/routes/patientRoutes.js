import express from "express";

import {
  createPatient,
  deletePatient,
  getPatients,
  getSinglePatient,
  updatePatient,
} from "../Controller/patientController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const patientRouter = express.Router();

// CREATE
patientRouter.post(
  "/create",
  protect,
  createPatient
);

// GET ALL
patientRouter.get(
  "/all",
  protect,
  getPatients
);

// GET SINGLE
patientRouter.get(
  "/:id",
  protect,
  getSinglePatient
);

// UPDATE
patientRouter.put(
  "/update/:id",
  protect,
  updatePatient
);

// DELETE (ADMIN ONLY)
patientRouter.delete(
  "/delete/:id",
  protect,
  adminOnly,
  deletePatient
);

export default patientRouter;
