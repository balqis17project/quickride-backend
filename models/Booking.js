// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickupLocation: String,
  dropoffLocation: String,
  date: String,
  time: String,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
