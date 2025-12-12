import { Router } from 'express';
import { healthCheckRouter } from './health-check';
import { registerUserRouter } from './register-user';
import { loginUserRouter } from './login-user/routes';

const router = Router();

router.use('/health-check', healthCheckRouter);
router.use('/register', registerUserRouter);
router.use('/login', loginUserRouter);

export { router as publicRouter };
