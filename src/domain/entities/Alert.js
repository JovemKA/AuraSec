import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  checkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Check', required: true },
  sentTo: [{ type: String }],
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export const Alert = mongoose.model('Alert', AlertSchema);
