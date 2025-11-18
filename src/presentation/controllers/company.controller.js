import { createCompanyUsecase } from '../../application/usecases/create-company.usecase.js';
import { getCompanyUsecase } from '../../application/usecases/get-company.usecase.js';
import { listCompaniesUsecase } from '../../application/usecases/list-companies.usecase.js';
import { updateCompanyUsecase } from '../../application/usecases/update-company.usecase.js';
import { deleteCompanyUsecase } from '../../application/usecases/delete-company.usecase.js';
import { addDomainUsecase } from '../../application/usecases/add-domain.usecase.js';

export class CompanyController {
  
  async create(req, res, next) {
    try {
      const result = await createCompanyUsecase(req.body);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await getCompanyUsecase(id);
      if (!result) return res.status(404).json({ message: 'Company not found' });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const { name, status } = req.query;
      const result = await listCompaniesUsecase({ name, status });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const result = await updateCompanyUsecase(id, req.body);
      if (!result) return res.status(404).json({ message: 'Company not found' });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const ok = await deleteCompanyUsecase(id);
      if (!ok) return res.status(404).json({ message: 'Company not found' });
      return res.json({ message: 'Company deleted successfully' });
    } catch (err) {
      next(err);
    }
  }

  async addDomain(req, res, next) {
    try {
      const { id } = req.params;
      const result = await addDomainUsecase(id, req.body);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
