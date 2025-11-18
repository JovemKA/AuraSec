import { Company } from './models/company.model.js';
import { CompanyEntity } from '../../domain/entities/company.entity.js';

export class CompanyRepositoryImpl {
  static toEntity(doc) {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    return new CompanyEntity({
      id: obj._id?.toString(),
      name: obj.name,
      officialDomains: obj.officialDomains || [],
      brandKeywords: obj.brandKeywords || [],
      alertEmails: obj.alertEmails || [],
      status: obj.status,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    });
  }

  async create(CompanyEntity) {
    const created = await Company.create(CompanyEntity);
    return CompanyRepositoryImpl.toEntity(created);
  }

  async findById(id) {
    const doc = await Company.findById(id);
    return CompanyRepositoryImpl.toEntity(doc);
  }

  async findAll(filter = {}) {
    const docs = await Company.find(filter);
    return docs.map(CompanyRepositoryImpl.toEntity);
  }

  async update(id, updates) {
    const doc = await Company.findByIdAndUpdate(id, { $set: updates }, { new: true });
    return CompanyRepositoryImpl.toEntity(doc);
  }

  async delete(id) {
    const res = await Company.findByIdAndDelete(id);
    return !!res;
  }

  async findByDomain(domain) {
    const doc = await Company.findOne({ 'officialDomains.domain': domain });
    return CompanyRepositoryImpl.toEntity(doc);
  }
}
