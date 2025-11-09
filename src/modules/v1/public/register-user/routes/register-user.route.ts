import { Router } from 'express';
import { registerUserController } from '../controllers/index.js';
import { registerSchema } from '../validations/register-user.validation.js';
import { validate } from '@/middlewares/validate.middleware.js';

const router = Router();

router.post('/', validate(registerSchema), registerUserController);

export { router as registerUserRouter };
