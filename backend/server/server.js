import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

// ✅ Load env variables
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded photos

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Multer setup for photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Mongoose Schemas
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

// ✅ Routes

// 📌 Missing Report
app.post("/api/report-missing", upload.single("photo"), async (req, res) => {
  try {
    const { name, age, gender, lastSeenLocation, description } = req.body;

    if (!name || !age || !gender || !lastSeenLocation || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReport = new Report({
      name,
      age,
      gender,
      lastSeenLocation,
      description,
      photo: req.file ? `/uploads/${req.file.filename}` : null,
      title: `Missing Person Reported: ${name}`,
      article: `${name}, aged ${age}, identified as ${gender}, was last seen at ${lastSeenLocation}. Description: ${description}.`,
      caseType: "missing",
    });

    await newReport.save();
    res.status(201).json({ message: "✅ Missing report submitted successfully", report: newReport });
  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

// 📌 Accident Report
app.post("/api/report-accident", async (req, res) => {
  try {
    const { name, age, gender, location, injuryType, description } = req.body;

    if (!name || !age || !gender || !location || !injuryType || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAccident = new RoadAccident({
      name,
      age,
      gender,
      location,
      injuryType,
      description,
      title: `Accident Reported at ${location}`,
      article: `${name}, aged ${age}, identified as ${gender}, was in an accident at ${location}. Injury type: ${injuryType}. Description: ${description}.`,
      caseType: "road-accident",
    });

    await newAccident.save();
    res.status(201).json({ message: "✅ Accident report submitted successfully", report: newAccident });
  } catch (err) {
    console.error("Accident error:", err);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

// 📌 Fetch All Reports
app.get("/api/reports", async (req, res) => {
  try {
    const missing = await Report.find().lean();
    const accidents = await RoadAccident.find().lean();
    const allReports = [...missing, ...accidents];

    // sort newest first
    allReports.sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted));

    res.json(allReports);
  } catch (err) {
    console.error("Fetch reports error:", err);
    res.status(500).json({ message: "❌ Failed to fetch reports" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
