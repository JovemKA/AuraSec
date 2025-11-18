export class MonitoredDomainRepository {
  async create(data) {
    throw new Error('Method not implemented');
  }
  
  async findAllByCompany(companyId, opts = {}) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByDomain(domain) {
    throw new Error('Method not implemented');
  }

  async update(id, data) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async markChecked(id, { status = 'checked', whois = {}, lastChecked = new Date() } = {}) {
    throw new Error('Method not implemented');
  }
}