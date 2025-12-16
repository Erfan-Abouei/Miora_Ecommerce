import { Router } from 'express';
import { healthCheckRouter } from './health-check';
import { registerUserRouter } from './register';
import { loginUserRouter } from './login/routes';

const router = Router();

router.use('/health-check', healthCheckRouter);
router.use('/register', registerUserRouter);
router.use('/login', loginUserRouter);

export { router as publicRouter };
