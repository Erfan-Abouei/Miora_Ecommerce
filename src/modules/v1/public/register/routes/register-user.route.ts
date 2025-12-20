import { Router } from 'express';
import { validate } from '@/middlewares/auth/validate.middleware';
import { registerUserSchema } from '../validations';
import { registerUserConfirmSchema } from '../validations';
import { registerUserController, registerUserConfirmController, registerUserResendOtpController } from '../controllers';

const router = Router();

router.post('/', validate(registerUserSchema), registerUserController);
router.post('/confirm', validate(registerUserConfirmSchema), registerUserConfirmController);
router.post('/confirm/resend-otp', registerUserResendOtpController)

export { router as registerUserRouter };
