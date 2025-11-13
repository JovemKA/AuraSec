import express from 'express';
import { CompanyController } from './controllers/company.controller.js';

const router = express.Router();
const controller = new CompanyController();

// Rotas de Company
router.post('/companies', controller.create.bind(controller));
router.get('/companies', controller.list.bind(controller));
router.get('/companies/:id', controller.getById.bind(controller));
router.put('/companies/:id', controller.update.bind(controller));
router.delete('/companies/:id', controller.delete.bind(controller));
router.post('/companies/:id/domains', controller.addDomain.bind(controller));

export default router;
