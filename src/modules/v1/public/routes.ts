import { Router } from 'express';
import { healthCheckRouter } from './health-check/index.js';
import { registerUserRouter } from './register-user/index.js';
import { authCheckRouter } from './auth-check/index.js';

const router = Router();

router.use('/health-check', healthCheckRouter);
router.use('/register', registerUserRouter);
router.use('/auth-check', authCheckRouter);

export { router as publicRouter };
