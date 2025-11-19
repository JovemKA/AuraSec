import {
  create,
  getById,
  getByDomain,
  listByCompany,
  update,
  markChecked,
  remove
} from '../../application/usecases/monitored-domain.usecases.js';

export class MonitoredDomainController {

  async create(req, res) {
    try {
      const output = await create(req.body);
      return res.status(201).json(output);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: 'Domain already monitored' });
      }
      return res.status(400).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const output = await getById(req.params.id);
      return output
        ? res.json(output)
        : res.status(404).json({ message: 'Not found' });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getByDomain(req, res) {
    try {
      const output = await getByDomain(req.params.domain);
      return output
        ? res.json(output)
        : res.status(404).json({ message: 'Not found' });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async listByCompany(req, res) {
    const { companyId } = req.params;
    const { limit, skip, sort } = req.query;

    const opts = {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
      sort: sort ? JSON.parse(sort) : undefined
    };

    const output = await listByCompany(companyId, opts);
    return res.json(output);
  }

  async update(req, res) {
    try {
      const output = await update(req.params.id, req.body);
      return output
        ? res.json(output)
        : res.status(404).json({ message: 'Not found' });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  
  async markChecked(req, res) {
    try {
      const output = await markChecked(req.params.id, req.body);
      return output
        ? res.json(output)
        : res.status(404).json({ message: 'Not found' });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      await remove(req.params.id);
      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}
