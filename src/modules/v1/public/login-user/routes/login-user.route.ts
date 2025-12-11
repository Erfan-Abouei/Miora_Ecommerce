import { validate } from '@/middlewares/auth/validate.middleware';
import { Router } from 'express';
import { loginUserSchema } from '../validations/login-user.validation';
import { loginUserController } from '../controllers/login-user.controller';

const router = Router();

router.post('/', validate(loginUserSchema), loginUserController);

export { router as loginUserRouter };
