import { Router } from 'express';
import { authCheckRouter } from './auth-check/index';

const router = Router();

router.use('/auth-check', authCheckRouter);

export { router as userRouter };
