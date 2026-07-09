import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './src/api/middleware/cors.js';
import userRouter from './src/api/routes/user.js';
import tasksRouter from './src/api/routes/tasks.js';
import agentRouter from './src/api/routes/agent.js';
import progressRouter from './src/api/routes/progress.js';
import managerRouter from './src/api/routes/manager.js';
import aiLiteracyRouter from './src/api/routes/aiLiteracy.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/agent', agentRouter);
app.use('/api/progress', progressRouter);
app.use('/api/manager', managerRouter);
app.use('/api/ai-literacy', aiLiteracyRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 PILOTforce backend running on http://localhost:${PORT}`);
  console.log(`📋 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health\n`);
});
