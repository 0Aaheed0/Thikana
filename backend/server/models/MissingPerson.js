import mongoose from 'mongoose';

const missingPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  lastSeenLocation: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String }, // Assuming photo is stored as a URL
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('MissingPerson', missingPersonSchema);
