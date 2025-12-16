import { Router } from 'express';
import { validate } from '@/middlewares/auth/validate.middleware';
import { registerUserSchema } from '../validations/register.validation';
import { registerUserConfirmSchema } from '../validations/register-confirm.validation';
import { registerUserController, registerUserConfrimController } from '../controllers';

const router = Router();

router.post('/', validate(registerUserSchema), registerUserController);
router.post('/confirm', validate(registerUserConfirmSchema), registerUserConfrimController);

export { router as registerUserRouter };
