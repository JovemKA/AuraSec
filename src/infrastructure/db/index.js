import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../../shared/logger.js';

// import Client from './models/client.model.js';
// import Analysis from './models/analysis.model.js';
// import Takedown from './models/takedown.model.js';

dotenv.config();

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_NAME,
  MONGO_APPNAME,
} = process.env;

const MONGO_URI = `mongodb+srv://${encodeURIComponent(MONGO_USER)}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_CLUSTER}/${MONGO_NAME}?retryWrites=true&w=majority&appName=${MONGO_APPNAME}`;

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: MONGO_NAME,
    });

    logger.info(`Connected to MongoDB Atlas [DB: ${MONGO_NAME}]`);
  } catch (err) {
    logger.error('MongoDB connection failed:', err);
    process.exit(1);
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected');
  } catch (err) {
    logger.error('Failed to disconnect MongoDB:', err);
  }
}

/**
 * Exporta os modelos (para usar em services/usecases)
 */
// export { Client, Analysis, Takedown };
