import { validateQuery } from '@/middlewares';
import { rateLimitMiddleWare } from '@/middlewares';
import { Router } from 'express';
import { validate } from '@/middlewares';
import { registerUserSchema, registerUserResendOtpSchema, registerUserConfirmSchema } from '../validations';
import { registerUserController, registerUserConfirmController, registerUserResendOtpController } from '../controllers';
import { ENV } from '@/config';
import { registerUserConfirmQuerySchema } from '../validations';

const router = Router();

router.post('/', validate(registerUserSchema), registerUserController);
router.post('/confirm', rateLimitMiddleWare(ENV.OTP_RESEND_ATTEMPTS, ENV.OTP_RESEND_ATTEMPTS_TIMER), validateQuery(registerUserConfirmQuerySchema), validate(registerUserConfirmSchema), registerUserConfirmController);
router.post('/resend-otp', validate(registerUserResendOtpSchema), registerUserResendOtpController);

export { router as registerUserRouter };
