import express from "express";

import {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} from "../Controller/doctorController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

// import {
//   protect,
//   adminOnly,
// } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  adminOnly,
  createDoctor
);

router.get(
  "/all",
  protect,
  getDoctors
);

router.put(
  "/update/:id",
  protect,
  adminOnly,
  updateDoctor
);

router.delete(
  "/delete/:id",
  protect,
  adminOnly,
  deleteDoctor
);

export default router
