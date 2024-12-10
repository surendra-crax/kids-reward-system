import express from 'express';
import { validateReward } from '../middleware/validateRequest.js';
import { getRewards, addReward, claimReward, deleteReward } from '../database/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const rewards = await getRewards();
  res.json(rewards);
});

router.post('/', validateReward, async (req, res) => {
  const result = await addReward({
    id: Date.now().toString(),
    ...req.body,
    claimed: false
  });
  res.status(201).json(result);
});

router.patch('/:id/claim', async (req, res) => {
  const result = await claimReward(req.params.id);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const result = await deleteReward(req.params.id);
  res.json(result);
});

export default router;