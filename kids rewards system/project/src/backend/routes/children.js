import express from 'express';
import { validateChild } from '../middleware/validateRequest.js';
import { getChildren, getChild, addChild, updateChildPoints } from '../database/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const children = await getChildren();
  res.json(children);
});

router.get('/:id', async (req, res) => {
  const child = await getChild(req.params.id);
  if (!child) {
    return res.status(404).json({ error: 'Child not found' });
  }
  res.json(child);
});

router.post('/', validateChild, async (req, res) => {
  const result = await addChild({
    id: Date.now().toString(),
    ...req.body,
    points: 0
  });
  res.status(201).json(result);
});

router.patch('/:id/points', async (req, res) => {
  const result = await updateChildPoints(req.params.id, req.body.points);
  res.json(result);
});

export default router;