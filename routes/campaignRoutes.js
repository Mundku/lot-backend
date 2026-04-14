import express from 'express';
import { getCampaigns, saveCampaign, deleteCampaign } from '../controllers/campaignController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCampaigns)  // Хүн бүр харж болно
  .post(protect, adminOnly, saveCampaign);  // Зөвхөн админ

router.delete('/:id', protect, adminOnly, deleteCampaign);

export default router;