import express from 'express';
import { userProfile } from '../../data/store.js';

const router = express.Router();

/**
 * GET /api/user/:userId
 * Returns user profile information
 */
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  // In a real system, we'd query by userId. For the demo, validate it matches.
  if (userId !== userProfile.userId) {
    return res.status(404).json({
      error: 'User not found',
      message: `No user found with ID: ${userId}`,
    });
  }

  res.json(userProfile);
});

export default router;
