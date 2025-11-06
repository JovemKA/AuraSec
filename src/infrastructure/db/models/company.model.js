import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  officialDomains: [{ type: String, required: true }],
  brandKeywords: [{ type: String, required: true }],
  alertEmails: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});

export const Company = mongoose.model('Company', CompanySchema);
