import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load user profile data
const userProfilePath = join(__dirname, '../../data/userProfile.json');
let userProfile;

function loadUserProfile() {
  userProfile = JSON.parse(readFileSync(userProfilePath, 'utf-8'));
}

// Initialize on module load
loadUserProfile();

/**
 * GET /api/user/:userId
 * Returns user profile information
 */
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  // In a real system, we'd query by userId
  // For demo, we validate it matches our demo user
  if (userId !== userProfile.userId) {
    return res.status(404).json({
      error: 'User not found',
      message: `No user found with ID: ${userId}`,
    });
  }

  res.json(userProfile);
});

export default router;
