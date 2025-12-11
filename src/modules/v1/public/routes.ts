import { Router } from 'express';
import { healthCheckRouter } from './health-check/index';
import { registerUserRouter } from './register-user/index';
import { loginUserRouter } from './login-user/routes/index';

const router = Router();

router.use('/health-check', healthCheckRouter);
router.use('/register', registerUserRouter);
router.use('/login', loginUserRouter);

export { router as publicRouter };
