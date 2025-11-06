import mongoose from 'mongoose';

const MonitoredDomainSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  domain: { type: String, required: true, unique: true },
  source: { type: String, enum: ['manual', 'generated'], default: 'generated' },
  whois: { type: Object, default: {} },
  status: { type: String, enum: ['pending', 'checked', 'alerted'], default: 'pending' },
  firstSeen: { type: Date, default: Date.now },
  lastChecked: { type: Date },
});

MonitoredDomainSchema.index({ domain: 1 });

export const MonitoredDomain = mongoose.model('MonitoredDomain', MonitoredDomainSchema);
