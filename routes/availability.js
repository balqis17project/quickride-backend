// routes/availability.js
import express from 'express';

const router = express.Router();

// TEST ROUTE ✅
router.post('/set', (req, res) => {
  const payload = req.body;
  console.log('📥 Received Availability Payload:', payload);

  // Simpan ke DB nanti... sekarang kita just test je
  res.status(200).json({
    message: '✅ Availability received!',
    received: payload,
  });
});

export default router;
