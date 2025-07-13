// backend/models/CoverageArea.js
import mongoose from 'mongoose';

const CoverageAreaSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  areas: {
    type: [String], // Contoh: ["UiTM Tapah", "Kampar", "Slim River"]
    required: true,
  },
}, { timestamps: true });

const CoverageArea = mongoose.model('CoverageArea', CoverageAreaSchema);

export default CoverageArea;
