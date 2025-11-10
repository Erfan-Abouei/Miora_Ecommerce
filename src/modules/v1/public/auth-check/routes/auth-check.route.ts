import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth-middlewares/auth.middleware.js';
import authCheckController from '../controllers/auth-check.controller.js';

const router = Router();

router.get('/', authMiddleware, authCheckController);

export { router as authCheckRouter };
