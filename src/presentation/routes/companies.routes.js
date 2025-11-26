import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller.js';

const router = Router();
const ctrl = new CompanyController();

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);
router.post('/:id/domains', ctrl.addDomain);

export default router;
