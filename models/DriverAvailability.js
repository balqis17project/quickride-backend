// models/DriverAvailability.js
import mongoose from 'mongoose';

const driverAvailabilitySchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  availableFrom: { type: String, required: true },
  availableTo: { type: String, required: true },
  areasCovered: { type: [String], required: true },
}, { timestamps: true });

export default mongoose.model('DriverAvailability', driverAvailabilitySchema);
