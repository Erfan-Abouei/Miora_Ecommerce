import { Router } from 'express';
import { authCheckRouter } from './auth-check/index';
import { logoutUserRouter } from './logout-user/index';

const router = Router();

router.use('/auth-check', authCheckRouter);
router.use('/logout', logoutUserRouter);

export { router as userRouter };
