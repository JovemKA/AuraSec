import express from 'express';
import routes from './presentation/routes.js';
import logger from './shared/logger.js';

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Rotas
app.use('/api', routes);

// health-check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

export default app;
