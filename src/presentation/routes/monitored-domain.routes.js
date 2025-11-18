import { Router } from 'express';
import { MonitoredDomainController } from '../controllers/monitored-domain.controller.js';

const router = Router();
const ctrl = new MonitoredDomainController();

router.post('/', ctrl.create);
router.get('/company/:companyId', ctrl.listByCompany);
router.get('/id/:id', ctrl.getById);
router.get('/domain/:domain', ctrl.getByDomain);
router.put('/:id', ctrl.update);
router.post('/:id/mark-checked', ctrl.markChecked);
router.delete('/:id', ctrl.delete);

export default router;
