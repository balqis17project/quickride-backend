const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const Booking = require('../models/Booking');

// GET /api/drivers/available
router.get('/available', async (req, res) => {
  const { pickup, dropoff, date, time } = req.query;

  try {
    // Find all drivers who are approved
    const allDrivers = await Driver.find({ status: 'approved' });

    // Filter out drivers already booked at same date & time
    const bookings = await Booking.find({ date, time });

    const bookedDriverIds = bookings.map((b) => b.driverId?.toString());

    const availableDrivers = allDrivers.filter((driver) => {
      return !bookedDriverIds.includes(driver._id.toString());
    });

    res.json(availableDrivers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
