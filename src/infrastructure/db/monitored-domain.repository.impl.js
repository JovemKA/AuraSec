import { MonitoredDomain } from "./models/monitored-domain.model.js";
import { MonitoredDomainEntity } from "../../domain/entities/monitored-domain.entity.js";

export class MonitoredDomainRepositoryImpl {
  static toEntity(doc) {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    return new MonitoredDomainEntity({
      id: obj._id?.toString(),
      companyId: obj.companyId?.toString(),
      domain: obj.domain,
      source: obj.source,
      whois: obj.whois,
      status: obj.status,
      firstSeen: obj.firstSeen,
      lastChecked: obj.lastChecked,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt
    });
  }

  async create(data) {
    const doc = await MonitoredDomain.create(data);
    return MonitoredDomainRepositoryImpl.toEntity(doc);
  }

  async findAllByCompany(companyId, { limit = 100, skip = 0, sort = { firstSeen: -1 } } = {}) {
    const docs = await MonitoredDomain.find({ companyId })
      .sort(sort)
      .skip(skip)
      .limit(limit);
    return docs.map(MonitoredDomainRepositoryImpl.toEntity);
  }

  async findById(id) {
    const doc = await MonitoredDomain.findById(id);
    return MonitoredDomainRepositoryImpl.toEntity(doc);
  }

  async findByDomain(domain) {
    const doc = await MonitoredDomain.findOne({ domain });
    return MonitoredDomainRepositoryImpl.toEntity(doc);
  }

  async update(id, data) {
    const doc = await MonitoredDomain.findByIdAndUpdate(id, data, { new: true });
    return MonitoredDomainRepositoryImpl.toEntity(doc);
  }

  async delete(id) {
    await MonitoredDomain.findByIdAndDelete(id);
    return true;
  }

  async markChecked(id, { status = 'checked', whois = {}, lastChecked = new Date() } = {}) {
    const doc = await MonitoredDomain.findByIdAndUpdate(
      id,
      { status, whois, lastChecked },
      { new: true }
    );
    return MonitoredDomainRepositoryImpl.toEntity(doc);
  }
}
