import asyncHandler from '../middleware/asyncHandler.js';
import Winner from '../models/Winner.js';

export const getWinners = asyncHandler(async (req, res) => {
  const winners = await Winner.find().sort({ _id: -1 });
  res.json(winners);
});

export const addWinner = asyncHandler(async (req, res) => {
  const w = req.body;
  if (!w.campaignId || !w.ticket) {
    return res.status(400).json({ error: 'campaignId & ticket required' });
  }

  const winner = new Winner({
    campaignId: String(w.campaignId).toUpperCase(),
    ticket: String(w.ticket).toUpperCase(),
    name: w.name || 'Хэрэглэгч',
    prize: w.prize || 'Шагнал',
    date: w.date || new Date().toISOString().slice(0, 10)
  });
  await winner.save();
  res.json(winner);
});

export const deleteWinner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Winner.deleteOne({ id });
  res.json({ ok: true });
});