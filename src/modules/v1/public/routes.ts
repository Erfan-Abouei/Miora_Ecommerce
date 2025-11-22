import { Router } from 'express';
import { healthCheckRouter } from './health-check/index.js';
import { registerUserRouter } from './register-user/index.js';

const router = Router();

router.use('/health-check', healthCheckRouter);
router.use('/register', registerUserRouter);

export { router as publicRouter };
