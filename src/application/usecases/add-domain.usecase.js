import { CompanyService } from '../services/company.service.js';
const service = new CompanyService();

export async function addDomainUsecase(companyId, domainData) {
  return service.addOfficialDomain(companyId, domainData);
}
