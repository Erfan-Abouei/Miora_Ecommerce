import { Router } from 'express';
import { authCheckRouter } from './auth-check/index.js';

const router = Router();

router.get('/auth-check', authCheckRouter);

export { router as userRouter };
