import asyncHandler from '../middleware/asyncHandler.js';
import Campaign from '../models/Campaign.js';

export const getCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find().sort({ _id: -1 });
  res.json(campaigns);
});

export const saveCampaign = asyncHandler(async (req, res) => {
  const c = req.body;
  const existing = await Campaign.findOne({ id: c.id });
  if (existing) {
    Object.assign(existing, c);
    await existing.save();
    return res.json(existing);
  }
  const newCampaign = new Campaign(c);
  await newCampaign.save();
  res.json(newCampaign);
});

export const deleteCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Campaign.deleteOne({ id });
  res.json({ ok: true });
});