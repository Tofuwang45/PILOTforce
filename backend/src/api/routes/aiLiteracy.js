import express from 'express';
import { aiLiteracy } from '../../data/store.js';

const router = express.Router();

/**
 * GET /api/ai-literacy/:userId
 * Returns AI literacy progress and recommendations
 */
router.get('/:userId', (req, res) => {
  res.json(aiLiteracy);
});

export default router;
