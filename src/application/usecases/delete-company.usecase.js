import { CompanyService } from '../services/company.service.js';

const service = new CompanyService();

export async function deleteCompanyUsecase(companyId) {
	return service.deleteCompany(companyId);
}
