import { Router } from 'express';
import { validate } from '@/middlewares/auth/validate.middleware';
import { registerUserSchema } from '../validations/register-user.validation';
import { registerUserConfirmSchema } from '../validations/register-user-confirm.validation';
import { registerUserController, registerUserConfrimController } from '../controllers/index';

const router = Router();

router.post('/', validate(registerUserSchema), registerUserController);
router.post('/confirm', validate(registerUserConfirmSchema), registerUserConfrimController);

export { router as registerUserRouter };
