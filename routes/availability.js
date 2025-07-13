import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/search", async (req, res) => {
  const { dateTime } = req.body;

  if (!dateTime) {
    return res.status(400).json({ message: "Date and time required" });
  }

  try {
    const availableDrivers = await User.find({ role: "driver", status: "approved" });
    res.json(availableDrivers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
