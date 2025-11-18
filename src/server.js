import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './infrastructure/db/index.js';
import logger from './shared/logger.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
    } catch (err) {
        logger.error('Failed to start server:', err);
        process.exit(1);
    }
})();
