import { CompanyService } from '../services/company.service.js';
const service = new CompanyService();

export async function listCompaniesUsecase(filter = {}, opts = {}) {
  return service.listCompanies(filter, opts);
}
