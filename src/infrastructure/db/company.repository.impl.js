import { CompanyModel } from './models/company.model';
import { CompanyEntity } from '../../domain/entities/company.entity';

export class CompanyRepositoryImpl {
  static toEntity(doc) {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    return new CompanyEntity({
      id: obj._id?.toString(),
      name: obj.name,
      officialDomains: obj.officialDomains,
      brandKeywords: obj.brandKeywords,
      alertEmails: obj.alertEmails,
      status: obj.status,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    });
  }

  async create(CompanyEntity) {
    const created = await CompanyModel.create(CompanyEntity);
    return CompanyRepositoryImpl.toEntity(created);
  }

  async findById(id) {
    const doc = await CompanyModel.findById(id);
    return CompanyRepositoryImpl.toEntity(doc);
  }

  async findAll(filter = {}) {
    const docs = await CompanyModel.find(filter);
    return docs.map(CompanyRepositoryImpl.toEntity);
  }

  async update(id, updates) {
    const doc = await CompanyModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
    return CompanyRepositoryImpl.toEntity(doc);
  }

  async delete(id) {
    const res = await CompanyModel.findByIdAndDelete(id);
    return !!res;
  }

  async findByDomain(domain) {
    const doc = await CompanyModel.findOne({ 'officialDomains': domain });
    return CompanyRepositoryImpl.toEntity(doc);
  }
}
