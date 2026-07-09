import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load AI literacy data
const aiLiteracyPath = join(__dirname, '../../data/aiLiteracy.json');
let aiLiteracyData;

function loadAILiteracy() {
  aiLiteracyData = JSON.parse(readFileSync(aiLiteracyPath, 'utf-8'));
}

// Initialize on module load
loadAILiteracy();

/**
 * GET /api/ai-literacy/:userId
 * Returns AI literacy progress and recommendations
 */
router.get('/:userId', (req, res) => {
  res.json(aiLiteracyData);
});

export default router;
