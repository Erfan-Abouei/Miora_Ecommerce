import { Router } from 'express';
import { validate } from '@/middlewares/auth-middlewares/validate.middleware.js';
import { registerUserSchema } from '../validations/register-user.validation.js';
import { registerUserConfirmSchema } from '../validations/register-user-confirm.validation.js';
import { registerUserController, registerUserConfrimController } from '../controllers/index.js';

const router = Router();

router.post('/', validate(registerUserSchema), registerUserController);
router.post('/confirm', validate(registerUserConfirmSchema), registerUserConfrimController);

export { router as registerUserRouter };
