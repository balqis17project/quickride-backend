// routes/booking.js
const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

router.post('/', async (req, res) => {
  const { passengerId, driverId, pickupLocation, dropoffLocation, date, time } = req.body;

  try {
    const booking = new Booking({
      passengerId,
      driverId,
      pickupLocation,
      dropoffLocation,
      date,
      time,
      status: 'pending',
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/passenger/:id', async (req, res) => {
  try {
    const bookings = await Booking.find({ passengerId: req.params.id }).populate('driverId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
