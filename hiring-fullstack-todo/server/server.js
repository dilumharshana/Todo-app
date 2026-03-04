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

// config routes
app.use('/api', appRoutes);

// configure middlewears
app.use(errorHandler);
app.use(logger);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running in on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error: Database connection failed! \n${error.message}`);
    process.exit(1); 
  }
};

startServer();
