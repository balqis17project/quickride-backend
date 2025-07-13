import mongoose from 'mongoose';

const driverAvailabilitySchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: String,
  availableFrom: String, // eg: "08:00"
  availableTo: String,   // eg: "18:00"
  areasCovered: [String], // eg: ["Tapah", "Kampar"]
  maxPax: Number,
});

export default mongoose.model('DriverAvailability', driverAvailabilitySchema);
