import { Router } from 'express';
import { healthCheckRouter } from './health-check/index.js';

const publicRoutes = Router();

publicRoutes.use('/health-check', healthCheckRouter);

export default publicRoutes;
