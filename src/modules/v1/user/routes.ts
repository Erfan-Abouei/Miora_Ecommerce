import { Router } from 'express';
import { authCheckRouter } from './auth-check/index.js';

const router = Router();

router.use('/auth-check', authCheckRouter);

export { router as userRouter };
