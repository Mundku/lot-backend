import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const winnerSchema = new mongoose.Schema({
  id: { type: String, default: uuid, unique: true },
  campaignId: { type: String, required: true },
  ticket: { type: String, required: true },
  name: { type: String, default: 'Хэрэглэгч' },
  prize: { type: String, default: 'Шагнал' },
  date: { type: String, default: () => new Date().toISOString().slice(0,10) }
}, { timestamps: true });

export default mongoose.model('Winner', winnerSchema);