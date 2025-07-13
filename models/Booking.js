import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupLocation: String,
  dropoffLocation: String,
  dateTime: String,
  status: { type: String, default: 'booked' },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
