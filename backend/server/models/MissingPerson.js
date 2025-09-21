
import mongoose from 'mongoose';

const MissingPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  lastSeenLocation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // Or Buffer, depending on how you handle file uploads
  },
  caseType: {
    type: String,
    default: 'missing',
  },
  status: {
    type: String,
    default: 'open',
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
});

const MissingPerson = mongoose.model('MissingPerson', MissingPersonSchema);

export default MissingPerson;
