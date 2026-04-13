import express from 'express';
import { getCampaigns, saveCampaign, deleteCampaign } from '../controllers/campaignController.js';

const router = express.Router();

router.route('/')
  .get(getCampaigns)
  .post(saveCampaign);

router.delete('/:id', deleteCampaign);

export default router;