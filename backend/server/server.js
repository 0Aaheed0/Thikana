import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve('uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

import User from './models/User.js';

app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username.startsWith(" ")) {
      return res.status(400).json({ message: "Username cannot start with a space" });
    }

    if (!email.endsWith("gmail.com")) {
      return res.status(400).json({ message: "Email must be a gmail address" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Create and sign a JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and sign a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

import MissingPerson from './models/MissingPerson.js';

import path from "path";
import multer from "multer";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post("/api/report-missing", upload.single('photo'), async (req, res) => {
  try {
    const { name, age, gender, lastSeenLocation, description } = req.body;
    const photo = req.file ? req.file.path : null;
    const newMissingPerson = new MissingPerson({
      name,
      age,
      gender,
      lastSeenLocation,
      description,
      photo,
    });
    await newMissingPerson.save();
    res.status(201).json({ message: "Missing person report submitted successfully" });
  } catch (error) {
    console.error("Report missing error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

import RoadAccident from './models/RoadAccident.js';

app.post("/api/report-accident", async (req, res) => {
  try {
    const { name, age, gender, location, injuryType, description } = req.body;
    const newRoadAccident = new RoadAccident({
      name,
      age,
      gender,
      location,
      injuryType,
      description,
    });
    await newRoadAccident.save();
    res.status(201).json({ message: "Road accident report submitted successfully" });
  } catch (error) {
    console.error("Report accident error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/cases", async (req, res) => {
  try {
    const missingPersons = await MissingPerson.find();
    const roadAccidents = await RoadAccident.find();
    const cases = [...missingPersons, ...roadAccidents];
    res.status(200).json(cases);
  } catch (error) {
    console.error("Get cases error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
