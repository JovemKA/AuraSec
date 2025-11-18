import {
  create,
  getById,
  listCompanies,
  update,
  remove,
  addDomain
} from '../../application/usecases/company.usecases.js';

export class CompanyController {
  
  async create(req, res, next) {
    try {
      const result = await create(req.body);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await getById(id);
      if (!result) return res.status(404).json({ message: 'Company not found' });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const { name, status } = req.query;
      const result = await listCompanies({ name, status });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const result = await update(id, req.body);
      if (!result) return res.status(404).json({ message: 'Company not found' });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const ok = await remove(id);
      if (!ok) return res.status(404).json({ message: 'Company not found' });
      return res.json({ message: 'Company deleted successfully' });
    } catch (err) {
      next(err);
    }
  }

  async addDomain(req, res, next) {
    try {
      const { id } = req.params;
      const result = await addDomain(id, req.body);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
