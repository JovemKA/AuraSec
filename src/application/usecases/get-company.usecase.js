import { CompanyService } from '../services/company.service.js';
const service = new CompanyService();

export async function getCompanyUsecase(companyId) {
  return service.getCompanyById(companyId);
}
