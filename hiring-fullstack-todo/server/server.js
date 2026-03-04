import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';

import connectDB from './src/configs/db.js';
import appRoutes from './src/routes/app-routes.js';

import { PORT } from './src/constants/constants.js';
import { errorHandler } from './src/middlewear/error-middlewear.js';
import { logger } from './src/middlewear/logger-middlewear.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(logger);
app.use('/api', appRoutes);

// Start server 
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
});