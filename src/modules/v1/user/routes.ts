import { Router } from 'express';
import { authCheckRouter } from './auth-check';
import { logoutUserRouter } from './logout-user';
import { ProfileRouter } from './profile';

const router = Router();

router.use('/auth-check', authCheckRouter);
router.use('/logout', logoutUserRouter);
router.use('/profile', ProfileRouter)

export { router as userRouter };
