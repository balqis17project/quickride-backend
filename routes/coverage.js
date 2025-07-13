// backend/routes/coverage.js
import express from 'express';
import CoverageArea from '../models/CoverageArea.js';

const router = express.Router();

// POST: Add or update coverage areas for a driver
router.post('/', async (req, res) => {
  const { driverId, areas } = req.body;

  try {
    const existing = await CoverageArea.findOne({ driverId });

    if (existing) {
      existing.areas = areas;
      await existing.save();
      return res.json({ message: 'Coverage area updated.', data: existing });
    }

    const newCoverage = new CoverageArea({ driverId, areas });
    await newCoverage.save();
    res.status(201).json({ message: 'Coverage area saved.', data: newCoverage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving coverage area.' });
  }
});

// GET: Get coverage area by driver
router.get('/:driverId', async (req, res) => {
  try {
    const data = await CoverageArea.findOne({ driverId: req.params.driverId });
    res.json(data || { areas: [] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch coverage area.' });
  }
});

export default router;
