import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import { corsOptions } from '@/config/index.js';
import { apiLimiter } from '@/config/rate-limiter.config.js';
import { v1Router } from '@/modules/v1/routes.js';
import { requestLoggerHandler } from '@/middlewares/logger-middlewares/logger.middleware.js';
import { routeNotFoundHandler } from '@/middlewares/error-handler-middlewares/route-not-found.middleware.js';
import { errorHandler } from '@/middlewares/error-handler-middlewares/error-handler.middleware.js';

const app = express();

// Core middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(apiLimiter);
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(requestLoggerHandler);

// health check route for c-panel
app.get('/', (_: Request, res: Response) => res.status(200).json({ kara: 'Made by @Erfan_Abouei' }));
// API Routes V1
app.use('/api/v1/', v1Router);

// 404 handler
app.use(routeNotFoundHandler);

// error handler
app.use(errorHandler);

export default app;
