import { Router } from 'express';
import { healthCheckRouter } from './health-check/index.js';
import { registerUserRouter } from './register-user/index.js';
import { loginUserRouter } from './login-user/routes/index.js';

const router = Router();

router.use('/health-check', healthCheckRouter);
router.use('/register', registerUserRouter);
router.use('/login', loginUserRouter);

export { router as publicRouter };
