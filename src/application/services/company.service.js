import { CompanyRepositoryImpl } from '../../infrastructure/db/company.repository.impl.js';
import { CompanyEntity } from '../../domain/entities/company.entity.js';

export class CompanyService {
  constructor(repository = null) {
    this.repo = repository || new CompanyRepositoryImpl();
  }

  async createCompany(payload) {
    // Normalizações e validações mínimas
    if (!payload || !payload.name) throw new Error('name is required');
    if (!Array.isArray(payload.officialDomains) || payload.officialDomains.length === 0) {
      throw new Error('At least one official domain is required');
    }

    const normalizedDomains = payload.officialDomains.map(d =>
      typeof d === 'string' ? { domain: d } : d
    );

    // checar duplicidade por name
    const existingByName = await this.repo.findAll({ name: payload.name });
    if (existingByName && existingByName.length > 0) {
      throw new Error(`Company with name "${payload.name}" already exists`);
    }

    // checar cada domain se já pertence a outra company
    for (const d of normalizedDomains) {
      const found = await this.repo.findByDomain(d.domain);
      if (found) {
        throw new Error(`Domain ${d.domain} already registered to another company`);
      }
    }

    // montar entidade de domínio
    const entity = new CompanyEntity({
      name: payload.name,
      officialDomains: normalizedDomains.map(d => ({
        domain: d.domain,
        source: d.source || 'manual',
        verified: d.verified || false,
        addedAt: d.addedAt || new Date()
      })),
      brandKeywords: Array.isArray(payload.brandKeywords) ? payload.brandKeywords : [],
      alertEmails: Array.isArray(payload.alertEmails) ? payload.alertEmails : [],
      status: payload.status || 'active'
    });

    // Persistir
    const created = await this.repo.create(entity.toJSON ? entity.toJSON() : entity);
    return created;
  }

  async getCompanyById(id) {
    if (!id) throw new Error('id is required');
    return this.repo.findById(id);
  }

  async listCompanies(filter = {}, opts = {}) {
    // permitir busca por name ou status
    const q = {};
    if (filter.name) q.name = filter.name;
    if (filter.status) q.status = filter.status;
    return this.repo.findAll(q, opts);
  }

  async updateCompany(id, updates = {}) {
    if (!id) throw new Error('id is required');
    const allowed = ['name', 'brandKeywords', 'alertEmails', 'status'];
    const payload = {};
    for (const k of allowed) if (k in updates) payload[k] = updates[k];

    if (Object.keys(payload).length === 0) throw new Error('no valid fields to update');

    // se alterar nome, garantir unicidade simples
    if (payload.name) {
      const exist = await this.repo.findAll({ name: payload.name });
      if (exist && exist.some(e => e.id !== id)) {
        throw new Error('another company with same name exists');
      }
    }

    return this.repo.update(id, payload);
  }

  async addOfficialDomain(companyId, domainData) {
    if (!companyId) throw new Error('companyId is required');
    const domain = typeof domainData === 'string' ? domainData : domainData.domain;
    if (!domain) throw new Error('domain is required');

    // verificar se já pertence a outra company
    const found = await this.repo.findByDomain(domain);
    if (found && String(found.id || found._id) !== String(companyId)) {
      throw new Error('domain already registered to another company');
    }

    // buscar company existente
    const company = await this.repo.findById(companyId);
    if (!company) throw new Error('company not found');

    // atualizar via repository: push no subdocumento
    // construimos o objeto mínimo do domain
    const domainObj = {
      domain,
      source: domainData.source || 'manual',
      verified: domainData.verified || false,
      addedAt: domainData.addedAt || new Date()
    };

    return this.repo.addDomain ? this.repo.addDomain(companyId, domainObj)
      : this.repo.update(companyId, { officialDomains: [...(company.officialDomains || []), domainObj] });
  }

  async deleteCompany(id) {
    if (!id) throw new Error('id is required');
    return this.repo.delete(id);
  }
}
