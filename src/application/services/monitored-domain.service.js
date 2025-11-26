import { MonitoredDomainRepositoryImpl } from '../../infrastructure/db/monitored-domain.repository.impl.js';
import { MonitoredDomainEntity } from '../../domain/entities/monitored-domain.entity.js';

export class MonitoredDomainService {
  constructor(repository = null) {
    this.repo = repository || new MonitoredDomainRepositoryImpl();
  }

  async create(payload) {
    if (!payload) throw new Error('payload is required');
    if (!payload.companyId) throw new Error('companyId is required');
    if (!payload.domain) throw new Error('domain is required');
    
    const existing = await this.repo.findByDomain(payload.domain);
    if (existing) {
      throw new Error(`Domain ${payload.domain} is already being monitored`);
    }

    const entity = new MonitoredDomainEntity({
      companyId: payload.companyId,
      domain: payload.domain,
      source: payload.source || 'manual',
      status: 'pending',
      whois: payload.whois || {},
      firstSeen: new Date(),
      lastChecked: null
    });

    return this.repo.create(entity.toJSON ? entity.toJSON() : entity);
  }

  async getById(id) {
    if (!id) throw new Error('id is required');
    return this.repo.findById(id);
  }

  async getByDomain(domain) {
    if (!domain) throw new Error('domain is required');
    return this.repo.findByDomain(domain);
  }

  async listByCompany(companyId, opts = {}) {
    if (!companyId) throw new Error('companyId is required');
    return this.repo.findAllByCompany(companyId, opts);
  }

  async update(id, updates = {}) {
    if (!id) throw new Error('id is required');

    const allowed = ['status', 'whois', 'lastChecked'];
    const payload = {};

    for (const key of allowed) {
      if (key in updates) payload[key] = updates[key];
    }

    if (Object.keys(payload).length === 0) {
      throw new Error('no valid fields to update');
    }
    
    return this.repo.update(id, payload);
  }

  async markChecked(id, data = {}) {
    if (!id) throw new Error('id is required');

    return this.repo.markChecked(id, {
      status: data.status || 'checked',
      whois: data.whois || {},
      lastChecked: data.lastChecked || new Date()
    });
  }

  async delete(id) {
    if (!id) throw new Error('id is required');
    return this.repo.delete(id);
  }
}
