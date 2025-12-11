import { Router } from 'express';
import authCheckController from '../controllers/auth-check.controller';

const router = Router();

router.get('/', authCheckController);

export { router as authCheckRouter };
