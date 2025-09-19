import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import Models
import User from "./models/User.js";
import MissingPerson from "./models/MissingPerson.js";
import Accident from "./models/Accident.js";
import articles from "./articles.js";

// ====================== AUTH ======================

app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username.startsWith(" ")) {
      return res
        .status(400)
        .json({ message: "Username cannot start with a space" });
    }

    if (!email.endsWith("gmail.com")) {
      return res
        .status(400)
        .json({ message: "Email must be a gmail address" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ token, user: { id: newUser._id, username: newUser.username } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ====================== REPORT MISSING ======================

app.post("/api/report-missing", upload.single("photo"), async (req, res) => {
  try {
    const { name, age, gender, lastSeenLocation, description } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const newMissingPerson = new MissingPerson({
      name,
      age,
      gender,
      lastSeenLocation,
      description,
      photo,
    });

    await newMissingPerson.save();
    res.status(201).json(newMissingPerson);
  } catch (error) {
    console.error("Report missing error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ====================== REPORT ACCIDENT ======================

app.post("/api/report-accident", async (req, res) => {
  try {
    const { name, age, gender, location, injuryType, description } = req.body;
    const newAccident = new Accident({
      name,
      age,
      gender,
      location,
      injuryType,
      description,
    });
    await newAccident.save();
    res.status(201).json(newAccident);
  } catch (error) {
    console.error("Report accident error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ====================== GET ROUTES ======================

app.get("/api/missing-persons", async (req, res) => {
  try {
    const missingPersons = await MissingPerson.find();
    res.status(200).json(missingPersons);
  } catch (error) {
    console.error("Get missing persons error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/accidents", async (req, res) => {
  try {
    const accidents = await Accident.find();
    res.status(200).json(accidents);
  } catch (error) {
    console.error("Get accidents error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/articles", (req, res) => {
  res.status(200).json(articles);
});

// ====================== START SERVER ======================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
