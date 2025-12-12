import { validate } from '@/middlewares/auth/validate.middleware';
import { Router } from 'express';
import { loginUserSchema } from '../validations';
import { loginUserController } from '../controllers';

const router = Router();

router.post('/', validate(loginUserSchema), loginUserController);

export { router as loginUserRouter };
