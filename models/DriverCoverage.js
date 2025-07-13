// 📁 backend/models/DriverCoverage.js
import mongoose from 'mongoose';

const driverCoverageSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  areas: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now }
});

export const DriverCoverage = mongoose.model('DriverCoverage', driverCoverageSchema);
