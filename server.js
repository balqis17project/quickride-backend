// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import availabilityRoutes from './routes/availability.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/availability', availabilityRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://quickride_user:anang6428@clusterbalqis.tddcfxr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBalqis')
  .then(() => {
    app.listen(5000, () => {
      console.log('✅ Server running on port 5000');
    });
  })
  .catch(err => console.log('❌ DB Error:', err));
