import { CompanyService } from '../services/company.service.js';

const service = new CompanyService();

export async function createCompanyUsecase(inputDto, context = {}) {
  return service.createCompany(inputDto);
}
