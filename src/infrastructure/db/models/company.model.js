import mongoose from 'mongoose';

const officialDomainsSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  source: { type: String, enum: ['manual', 'auto'], default: 'manual' },
  verified: { type: Boolean, default: false },
  addedAt: { type: Date, default: Date.now },
}, { _id: false });

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  officialDomains: { type: [officialDomainsSchema], default: [] },
  brandKeywords: [{ type: String, required: true }],
  alertEmails: [{ type: String, required: true }],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

CompanySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

CompanySchema.index({ name: 1 }, { unique: true });
CompanySchema.index({ 'officialDomains.domain': 1 });

export const CompanyModel = mongoose.model('Company', CompanySchema);
