import { CompanyService } from '../services/company.service.js';

const service = new CompanyService();

export async function create(inputDto, context = {}) {
  return service.createCompany(inputDto);
}

export async function getById(id, context = {}) {
  return service.getCompanyById(id);
}

export async function listCompanies(filter = {}, opts = {}, context = {}) {
  return service.listCompanies(filter, opts);
}

export async function update(id, updates, context = {}) {
  return service.updateCompany(id, updates);
}

export async function remove(id, context = {}) {
  return service.deleteCompany(id);
}

export async function addDomain(companyId, domainData, context = {}) {
  return service.addOfficialDomain(companyId, domainData);
}
