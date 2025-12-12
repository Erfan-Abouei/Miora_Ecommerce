import { validate } from '@/middlewares/auth/validate.middleware';
import { Router } from 'express';
import { loginUserSchema } from '../validations/index';
import { loginUserController } from '../controllers/index';

const router = Router();

router.post('/', validate(loginUserSchema), loginUserController);

export { router as loginUserRouter };
