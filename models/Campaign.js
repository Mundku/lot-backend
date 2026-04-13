import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  desc: String,
  image: String,
  status: { type: String, default: 'active' },
  price: { type: Number, default: 2000 },
  total: { type: Number, default: 15000 },
  sold: { type: Number, default: 0 },
  end: String
}, { timestamps: true });

export default mongoose.model('Campaign', campaignSchema);