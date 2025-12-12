import { Router } from 'express';
import { authCheckRouter } from './auth-check';
import { logoutUserRouter } from './logout-user';

const router = Router();

router.use('/auth-check', authCheckRouter);
router.use('/logout', logoutUserRouter);

export { router as userRouter };
