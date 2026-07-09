import { getClaudeClient } from '../config/claude.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generates a personalized task checklist from manager config using Claude API.
 * Falls back to seed data if API key is not configured.
 *
 * @param {Object} managerConfig - The manager's configuration object
 * @returns {Promise<Object>} Generated tasks object
 */
export async function generateTasksFromConfig(managerConfig) {
  const client = getClaudeClient();

  // Graceful fallback: if no API key, return seed data
  if (!client) {
    console.log('📋 Using seed task data (no Claude API key configured)');
    const seedDataPath = join(__dirname, '../data/generatedTasks.json');
    const seedData = JSON.parse(readFileSync(seedDataPath, 'utf-8'));
    return seedData;
  }

  try {
    console.log('🤖 Generating tasks with Claude API...');

    const prompt = `You are an onboarding agent for Salesforce. Given this manager configuration for a new ${managerConfig.role} on the ${managerConfig.teamId} team, generate a detailed, ordered onboarding checklist.

Manager Configuration:
${JSON.stringify(managerConfig, null, 2)}

Generate a JSON object with a "tasks" array. Each task should have:
- taskId (e.g., "dev-env-01")
- category (from the manager config)
- title
- status ("PENDING", or "AWAITING_APPROVAL" if requiresApproval is true)
- order (sequential number)
- totalSteps (number of steps)
- currentStep (always 1 for new tasks)
- steps array with stepId, title, status, description, terminalOutput (null for PENDING), statusChip (null for PENDING)
- resources array with title, url, icon

Prioritize by dependency order. Make descriptions actionable and specific.`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Parse the response
    const responseText = message.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const generatedTasks = JSON.parse(jsonMatch[0]);
      console.log('✅ Tasks generated successfully via Claude API');
      return generatedTasks;
    } else {
      throw new Error('Failed to parse Claude response as JSON');
    }
  } catch (error) {
    console.error('⚠️  Claude API call failed, falling back to seed data:', error.message);
    // Fallback to seed data on error
    const seedDataPath = join(__dirname, '../data/generatedTasks.json');
    const seedData = JSON.parse(readFileSync(seedDataPath, 'utf-8'));
    return seedData;
  }
}
