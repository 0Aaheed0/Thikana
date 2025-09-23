import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import session from "express-session";
import passport from "passport";
import githubAuth from "./githubAuth.js";  // ✅ FIXED (added .js and import)

// ✅ Load env variables
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", githubAuth);
app.use("/uploads", express.static("uploads")); // serve uploaded photos

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ==========================
// 📌 Multer setup for file uploads
// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ==========================
// 📌 Mongoose Schemas
// ==========================

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String }, // ✅ added field
});
const User = mongoose.model("User", userSchema);

// Report Schemas
const reportSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  lastSeenLocation: String,
  description: String,
  photo: String,
  title: String,
  article: String,
  caseType: String, // "missing"
  dateSubmitted: { type: Date, default: Date.now },
});
const Report = mongoose.model("Report", reportSchema);

const accidentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  location: String,
  injuryType: String,
  description: String,
  title: String,
  article: String,
  caseType: String, // "road-accident"
  dateSubmitted: { type: Date, default: Date.now },
});
const RoadAccident = mongoose.model("RoadAccident", accidentSchema);

// ==========================
// 📌 ADMIN ROUTES
// ==========================
const allowedAdmins = [
  { email: "aaheedadmin@gmail.com", password: "aaheed94" },
  { email: "mirazadmin@gmail.com", password: "miraz92" },
  { email: "youshaadmin@gmail.com", password: "yousha87" },
];

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  const admin = allowedAdmins.find((a) => a.email === email && a.password === password);
  if (!admin) return res.status(401).json({ message: "❌ Invalid admin credentials" });

  const token = jwt.sign({ email, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ message: "✅ Admin login successful", token });
});

// Middleware to protect admin routes
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "❌ No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ message: "❌ Forbidden" });
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "❌ Invalid token" });
  }
}

// Admin: Get all reports
app.get("/api/admin/reports", verifyAdmin, async (req, res) => {
  try {
    const missing = await Report.find().lean();
    const accidents = await RoadAccident.find().lean();
    const allReports = [...missing, ...accidents].sort(
      (a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted)
    );
    res.json(allReports);
  } catch (err) {
    console.error("Admin fetch error:", err);
    res.status(500).json({ message: "❌ Failed to fetch reports" });
  }
});

// Admin: Update report
app.put("/api/admin/reports/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updated =
      (await Report.findByIdAndUpdate(id, req.body, { new: true })) ||
      (await RoadAccident.findByIdAndUpdate(id, req.body, { new: true }));
    if (!updated) return res.status(404).json({ message: "❌ Report not found" });
    res.json(updated);
  } catch (err) {
    console.error("Admin update error:", err);
    res.status(500).json({ message: "❌ Failed to update report" });
  }
});

// Admin: Delete report
app.delete("/api/admin/reports/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = (await Report.findByIdAndDelete(id)) || (await RoadAccident.findByIdAndDelete(id));
    if (!deleted) return res.status(404).json({ message: "❌ Report not found" });
    res.json({ message: "✅ Report deleted" });
  } catch (err) {
    console.error("Admin delete error:", err);
    res.status(500).json({ message: "❌ Failed to delete report" });
  }
});

// ==========================
// 📌 USER ROUTES
// ==========================

// User Login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });
    res.json({ message: "✅ Login successful", user: { id: user._id, username: user.username, email: user.email, profilePhoto: user.profilePhoto }, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

// Update user profile
app.put("/api/user/profile", upload.single("profilePhoto"), async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) return res.status(401).json({ message: "❌ No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const userId = decoded.id;

    const updateData = { username: req.body.username, email: req.body.email };

    if (req.body.password) {
      const hashed = await bcrypt.hash(req.body.password, 10);
      updateData.password = hashed;
    }

    if (req.file) updateData.profilePhoto = `/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).lean();
    res.json({ message: "✅ Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "❌ Failed to update profile" });
  }
});

// ==========================
// 📌 REPORT ROUTES
// ==========================

// Missing report
app.post("/api/report-missing", upload.single("photo"), async (req, res) => {
  try {
const { name, age, gender, lastSeenLocation, description } = req.body;
if (!name || !age || !gender || !lastSeenLocation || !description)
  return res.status(400).json({ message: "All fields are required" });


    const newReport = new Report({
      name, age, gender, lastSeenLocation, description,
      photo: req.file ? `/uploads/${req.file.filename}` : null,
      title: `Missing Person Reported: ${name}`,
      article: `${name}, aged ${age}, identified as ${gender}, was last seen at ${lastSeenLocation}. Description: ${description}.`,
      caseType: "missing",
      type: type || "missing",
    });

    await newReport.save();
    res.status(201).json({ message: "✅ Missing report submitted successfully", report: newReport });
  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

// Accident report
app.post("/api/report-accident", async (req, res) => {
  try {
const { name, age, gender, location, injuryType, description } = req.body;
if (!name || !age || !gender || !location || !injuryType || !description)
  return res.status(400).json({ message: "All fields are required" });

      return res.status(400).json({ message: "All fields are required" });

    const newAccident = new RoadAccident({
      name, age, gender, location, injuryType, description,
      title: `Accident Reported at ${location}`,
      article: `${name}, aged ${age}, identified as ${gender}, was in an accident at ${location}. Injury type: ${injuryType}. Description: ${description}.`,
      caseType: "road-accident",
      type: type || "road-accident",
    });

    await newAccident.save();
    res.status(201).json({ message: "✅ Accident report submitted successfully", report: newAccident });
  } catch (err) {
    console.error("Accident error:", err);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

// Fetch all reports
app.get("/api/reports", async (req, res) => {
  try {
    const missing = await Report.find().lean();
    const accidents = await RoadAccident.find().lean();
    const allReports = [...missing, ...accidents].sort(
      (a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted)
    );
    res.json(allReports);
  } catch (err) {
    console.error("Fetch reports error:", err);
    res.status(500).json({ message: "❌ Failed to fetch reports" });
  }
});

// ==========================
// ✅ Start Server
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
