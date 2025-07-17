// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import availabilityRoutes from './routes/availability.js';

dotenv.config();

const app = express();
const express = require('express');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/availability', availabilityRoutes);
const authRoutes = require('./routes/auth'); // pastikan path betul
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://quickride_user:anang6428@clusterbalqis.tddcfxr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBalqis')
  .then(() => {
    app.listen(5000, () => {
      console.log('✅ Server running on port 5000');
    });
  })
  .catch(err => console.log('❌ DB Error:', err));
