import cors from 'cors';

/**
 * CORS configuration for the PILOTforce backend.
 * Allows requests from the frontend development server.
 */
export const corsMiddleware = cors({
  origin: [
    'http://localhost:5173', // Vite default
    'http://localhost:5174', // Vite alternate
    'http://localhost:3000', // Common React dev port
    /^http:\/\/localhost:\d+$/, // Any localhost port
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
});
