import express from 'express';
import { getWinners, addWinner, deleteWinner } from '../controllers/winnerController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getWinners)  // Хүн бүр харж болно
  .post(protect, adminOnly, addWinner);

router.delete('/:id', protect, adminOnly, deleteWinner);

export default router;