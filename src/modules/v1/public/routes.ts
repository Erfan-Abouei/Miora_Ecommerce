import { Router } from 'express';
import { healthCheckRouter } from './health-check/index.js';
import { registerUserRouter } from './register-user/index.js';
import { validate } from '@/middlewares/validate.middleware.js';
import { registerSchema } from './register-user/validations/register-user.validation.js';

const router = Router();

router.use('/health-check', healthCheckRouter);
router.use('/register', registerUserRouter);

export { router as publicRouter };
