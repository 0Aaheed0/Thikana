import mongoose from 'mongoose';

const RoadAccidentSchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: true,
  },
  injuryType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  caseType: {
    type: String,
    default: 'road-accident',
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

const RoadAccident = mongoose.model('RoadAccident', RoadAccidentSchema);

export default RoadAccident;
