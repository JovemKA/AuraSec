import { Router } from 'express';
import { CompanyController } from './controllers/company.controller.js';

const router = Router();
const companyController = new CompanyController();

// Rotas de Company
router.post('/companies', companyController.create);
router.get('/companies', companyController.list);
router.get('/companies/:id', companyController.getById);
router.put('/companies/:id', companyController.update);
router.delete('/companies/:id', companyController.delete);
router.post('/companies/:id/domains', companyController.addDomain);

export default router;
