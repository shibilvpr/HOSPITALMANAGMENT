import express from "express";
import {
  createReceptionist,
  getReceptionists,
  updateReceptionist,
  deleteReceptionist,
} from "../Controller/receptionistController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, adminOnly, createReceptionist);
router.get("/all", protect, adminOnly, getReceptionists);
router.put("/update/:id", protect, adminOnly, updateReceptionist);
router.delete("/delete/:id", protect, adminOnly, deleteReceptionist);

export default router;
