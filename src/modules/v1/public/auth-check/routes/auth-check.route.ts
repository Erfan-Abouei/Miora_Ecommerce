import authCheckController from '../controllers/auth-check.controller.js';
import { authMiddleware } from '@/middlewares/auth.middleware.js';
import { Router } from 'express';

const router = Router();

router.get('/', authMiddleware, authCheckController);

export { router as authCheckRouter };
