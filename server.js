import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import connectDB from './src/configs/db.js';
import appRoutes from './src/routes/app-routes.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/', appRoutes);

// Start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
});