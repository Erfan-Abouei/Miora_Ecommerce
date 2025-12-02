import { validate } from '@/middlewares/auth-middlewares/validate.middleware.js';
import { Router } from 'express';
import { loginUserSchema } from '../validations/login-user.validation.js';
import { loginUserController } from '../controllers/login-user.controller.js';

const router = Router();

router.post('/', validate(loginUserSchema), loginUserController);

export { router as loginUserRouter };
