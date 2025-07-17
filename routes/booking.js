// routes/booking.js
import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all bookings made by a passenger
router.get('/passenger/:id', async (req, res) => {
  try {
    const bookings = await Booking.find({ passengerId: req.params.id }).populate('driverId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all bookings assigned to a driver
router.get('/driver/:id', async (req, res) => {
  try {
    const bookings = await Booking.find({ driverId: req.params.id }).populate('passengerId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Accept ride
router.patch('/accept/:id', async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Reject ride
router.patch('/reject/:id', async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Cancel ride
router.patch('/cancel/:id', async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
