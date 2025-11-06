import mongoose from 'mongoose';

const CheckSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  monitoredDomainId: { type: mongoose.Schema.Types.ObjectId, ref: 'MonitoredDomain', required: true },
  title: { type: String },
  metaDescription: { type: String },
  indicators: {
    hostnameSim: Number,
    titleSim: Number,
    resourceSim: Number,
    whoisRisk: Number,
    certRisk: Number,
  },
  score: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

CheckSchema.index({ score: -1 });

export const Check = mongoose.model('Check', CheckSchema);
