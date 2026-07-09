import express from 'express';
import { progress } from '../../data/store.js';

const router = express.Router();

/**
 * GET /api/progress/:userId
 * Returns the current progress summary. Read-only: progress is seeded from the
 * contract baseline (1/12) and updated in-memory as tasks complete via advance.
 */
router.get('/:userId', (req, res) => {
  res.json(progress);
});

export default router;
