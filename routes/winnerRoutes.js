import express from 'express';
import { getWinners, addWinner, deleteWinner } from '../controllers/winnerController.js';

const router = express.Router();

router.route('/')
  .get(getWinners)
  .post(addWinner);

router.delete('/:id', deleteWinner);

export default router;