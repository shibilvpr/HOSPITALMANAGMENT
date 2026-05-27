import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../Model/userSchema.js"; 


// SIGNUP 
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || "receptionist",
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const { password: _, ...userData } = user._doc;

    res.status(201).json({
      message: "Signup successful",
      token,
      user: userData,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// LOGIN 
export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        message: "User blocked",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const { password: _, ...userData } = user._doc;

    res.json({
      token,
      user: userData,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};


//  ADMIN 

export const getAllUsers = async (req, res) => {
  const users = await userModel
    .find()
    .select("-password");

  res.json(users);
};

export const toggleBlockUser = async (req, res) => {

  const user = await userModel.findById(
    req.params.id
  );

  user.isBlocked = !user.isBlocked;

  await user.save();

  res.json({
    message: "Updated"
  });
};