import mongoose from "mongoose";

const RoadAccidentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  injuryType: { type: String, required: true },
  description: { type: String, required: true },
  dateSubmitted: { type: Date, default: Date.now }
});

export default mongoose.model("RoadAccident", RoadAccidentSchema);
