import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Returns an Anthropic client if API key exists, otherwise null.
 * This allows graceful degradation when key is missing.
 */
export function getClaudeClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    console.warn('⚠️  ANTHROPIC_API_KEY not configured - agent features will use fallback data');
    return null;
  }

  return new Anthropic({
    apiKey: apiKey,
  });
}
