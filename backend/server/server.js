import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

import User from "./models/User.js";
import Report from "./models/Report.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ---------- Auth Routes ---------- */

app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username.startsWith(" ")) {
      return res.status(400).json({ message: "Username cannot start with a space" });
    }

    if (!email.endsWith("gmail.com")) {
      return res.status(400).json({ message: "Email must be a gmail address" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ---------- Report Routes ---------- */

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Create a new report
app.post("/api/report-missing", upload.single("photo"), async (req, res) => {
  try {
    const { name, age, gender, lastSeenLocation, description } = req.body;

    const newReport = new Report({
      name,
      age,
      gender,
      lastSeenLocation,
      description,
      photo: req.file ? `/uploads/${req.file.filename}` : null
    });

    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (error) {
    console.error("Report error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all reports
app.get("/api/reports", async (req, res) => {
  try {
    const reports = await Report.find().sort({ dateSubmitted: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
