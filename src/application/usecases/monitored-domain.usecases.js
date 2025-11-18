import { MonitoredDomainService } from "../services/monitored-domain.service.js";

const service = new MonitoredDomainService();

export async function create(inputDto, context = {}) {
  return service.create(inputDto);
}

export async function getById(id, context = {}) {
  return service.getById(id);
}

export async function getByDomain(domain, context = {}) {
  return service.getByDomain(domain);
}

export async function listByCompany(companyId, opts = {}, context = {}) {
  return service.listByCompany(companyId, opts);
}

export async function update(id, updates, context = {}) {
  return service.update(id, updates);
} 

export async function markChecked(id, data, context = {}) {
  return service.markChecked(id, data);
}

export async function remove(id, context = {}) {
  return service.delete(id);
}
