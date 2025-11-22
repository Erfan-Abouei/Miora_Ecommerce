import { Router } from 'express';
import { userAuthMiddleware } from '@/middlewares/auth-middlewares/user-auth.middleware.js';
import authCheckController from '../controllers/auth-check.controller.js';

const router = Router();

router.get('/', userAuthMiddleware, authCheckController);

export { router as authCheckRouter };
