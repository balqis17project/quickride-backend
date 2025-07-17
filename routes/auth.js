import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const express = require('express');
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, role, licenseNumber, carModel, plateNumber } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      status: role === "driver" ? "pending" : "approved",
      licenseNumber: role === "driver" ? licenseNumber : "",
      carModel: role === "driver" ? carModel : "",
      plateNumber: role === "driver" ? plateNumber : "",
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ email });
    if (!user || user.role !== role) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (user.role === "driver" && user.status !== "approved") {
      return res.status(403).json({ message: "Driver not approved yet" });
    }

    const token = jwt.sign({ userId: user._id }, "rahsia", { expiresIn: "7d" });

    res.json({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

router.patch('/update/:id', async (req, res) => {
  const { fullName, email } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, {
      fullName,
      email,
    }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


});

export default router;
