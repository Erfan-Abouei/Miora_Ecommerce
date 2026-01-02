import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { Request, Response } from 'express';
import { corsOptions, apiLimiter, ENV } from '@/config';
import { v1Router } from '@/modules/v1/routes';
import { requestLoggerHandler } from '@/middlewares';
import { routeNotFoundHandler } from '@/middlewares';
import { errorHandler } from '@/middlewares';

const app = express();
const isProduction: boolean = ENV.NODE_ENV === 'production';

// Core middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(apiLimiter);
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(requestLoggerHandler);
// swagger assets for dark mode
app.use('/swagger-assets', express.static(path.join(process.cwd(), `${isProduction ? '' : 'src'}/config/swagger/swagger-ui`)));

// health check route for c-panel
app.get('/', (_: Request, res: Response) => res.status(200).json({ kara: 'Made by @Erfan_Abouei' }));
// API Routes V1
app.use('/api/v1/', v1Router);

// 404 handler
app.use(routeNotFoundHandler);

// error handler
app.use(errorHandler);

export default app;
