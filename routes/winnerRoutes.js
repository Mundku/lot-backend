import express from 'express';
import { getWinners, addWinner, deleteWinner } from '../controllers/winnerController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getWinners)  // GET нь хамгаалалтгүй
  .post(protect, adminOnly, addWinner);

router.delete('/:id', protect, adminOnly, deleteWinner);

export default router;