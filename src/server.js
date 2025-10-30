import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './infrastructure/db/index.js';
import logger from './shared/logger.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectDB();
    app.listen(PORT, () => {
        logger.info(`Server running at http://localhost:${PORT}`);
    });
}

startServer();
