import { CompanyService } from '../services/company.service.js';
const service = new CompanyService();

export async function updateCompanyUsecase(companyId, updates) {
  return service.updateCompany(companyId, updates);
}
