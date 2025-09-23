import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  lastSeenLocation: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String }, // store filename
  type: { type: String, default: 'missing' }, // Add type field
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);

export default Report;
