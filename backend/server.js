import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import { login } from "./Controller/userController.js";
import patientRouter from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import receptionistRoutes from "./routes/receptionistRoutes.js";
import { userModel } from "./Model/userSchema.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/patient", patientRouter);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/receptionist", receptionistRoutes);

// Seed Admin User function
const seedAdmin = async () => {
  try {
    const adminExists = await userModel.findOne({ email: "shibilvpr@gmail.com" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("013348", 10);
      await userModel.create({
        name: "Admin",
        email: "shibilvpr@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Seeded default admin: shibilvpr@gmail.com / 013348");
    }
  } catch (error) {
    console.error("Admin seeding failed:", error);
  }
};

// MongoDB Connection
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("MongoDB Connected");
    seedAdmin();
  })
  .catch((err) => console.log("DB Error:", err));

// Routes (Signup route removed)
app.post("/login", login);

// Server
app.listen(process.env.PORT, () => {
  console.log(
    `Server running on http://localhost:${process.env.PORT}`
  );
});