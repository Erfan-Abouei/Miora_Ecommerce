import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import { corsOptions, apiLimiter } from '@/config';
import { v1Router } from '@/modules/v1/routes';
import { requestLoggerHandler } from '@/middlewares/logger/logger.middleware';
import { routeNotFoundHandler } from '@/middlewares/error/route-not-found.middleware';
import { errorHandler } from '@/middlewares/error/error-handler.middleware';

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
