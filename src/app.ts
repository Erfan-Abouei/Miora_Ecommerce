import { corsOptions } from '@/config/index.js';
import { requestLogger } from './middlewares/logger.middleware.js';
import { routeNotFoundHandler } from './middlewares/route-not-found.middleware.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import v1Routes from './modules/v1/routes.js';

const app = express();

// Core middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(requestLogger);

// API Routes
app.use('/api/v1/', v1Routes);

// 404 handler
app.use(routeNotFoundHandler);

export default app;
