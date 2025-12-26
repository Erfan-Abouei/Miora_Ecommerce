import { Router } from 'express';
import { validate } from '@/middlewares/auth/validate.middleware';
import { registerUserSchema, registerUserResendOtpSchema, registerUserConfirmSchema } from '../validations';
import { registerUserController, registerUserConfirmController, registerUserResendOtpController } from '../controllers';

const router = Router();

router.post('/', validate(registerUserSchema), registerUserController);
router.post('/confirm', validate(registerUserConfirmSchema), registerUserConfirmController);
router.post('/resend-otp', validate(registerUserResendOtpSchema), registerUserResendOtpController);

export { router as registerUserRouter };
