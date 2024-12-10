import express from 'express';
import { validateActivity } from '../middleware/validateRequest.js';
import { getActivities, addActivity, toggleActivity, deleteActivity } from '../database/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const activities = await getActivities();
  res.json(activities);
});

router.post('/', validateActivity, async (req, res) => {
  const result = await addActivity({
    id: Date.now().toString(),
    ...req.body,
    completed: false,
    date: new Date().toISOString()
  });
  res.status(201).json(result);
});

router.patch('/:id/toggle', async (req, res) => {
  const result = await toggleActivity(req.params.id);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const result = await deleteActivity(req.params.id);
  res.json(result);
});

export default router;