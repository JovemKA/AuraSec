import { Router } from 'express';
import companiesRouter from './routes/companies.routes.js';
import monitoredDomainRouter from './routes/monitored-domain.routes.js';

const router = Router();

router.use('/companies', companiesRouter);
router.use('/monitored-domains', monitoredDomainRouter);

export default router;
