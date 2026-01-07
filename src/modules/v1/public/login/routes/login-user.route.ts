import { validate } from '@/middlewares';
import { Router } from 'express';
import { loginUserSchema } from '../validations';
import { loginUserController } from '../controllers';
import { ENV } from '@/config';
import { rateLimitMiddleWare } from '@/middlewares';

const router = Router();

router.post('/', rateLimitMiddleWare(ENV.LOGIN_ATTEMPTS_MAX, ENV.LOGIN_ATTEMPTS_MAX_TIMER), validate(loginUserSchema), loginUserController);

export { router as loginUserRouter };
