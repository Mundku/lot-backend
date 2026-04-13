import asyncHandler from '../middleware/asyncHandler.js';
import Campaign from '../models/Campaign.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { campaignId, qty } = req.body;
  const campaign = await Campaign.findOne({ id: campaignId });
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  campaign.sold = (campaign.sold || 0) + qty;
  await campaign.save();

  res.json({ ok: true, sold: campaign.sold });
});