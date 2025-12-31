import { Router } from 'express';
import { healthCheckRouter } from './health-check';
import { registerUserRouter } from './register';
import { loginUserRouter } from './login/routes';
import { forgotPasswordRouter } from './forgot-password';

const router = Router();

router.use('/health-check', healthCheckRouter);
router.use('/register', registerUserRouter);
router.use('/login', loginUserRouter);
router.use('/forgot-password', forgotPasswordRouter);

export { router as publicRouter };
