import { validateQuery } from '@/middlewares';
import { rateLimitMiddleWare } from '@/middlewares';
import { Router } from 'express';
import { validate } from '@/middlewares';
import { registerUserSchema, registerUserResendOtpSchema, registerUserConfirmSchema } from '../validations';
import { registerUserController, registerUserConfirmController, registerUserResendOtpController } from '../controllers';
import { ENV } from '@/config';
import { registerUserConfirmQuerySchema } from '../validations/register-user-confirm-query.validation';

const router = Router();

router.post('/', validate(registerUserSchema), registerUserController);
router.post('/confirm', validateQuery(registerUserConfirmQuerySchema), validate(registerUserConfirmSchema), registerUserConfirmController);
router.post('/resend-otp', rateLimitMiddleWare(ENV.OTP_RESEND_ATTEMPS, ENV.OTP_RESEND_ATTEMPS_TIMER), validate(registerUserResendOtpSchema), registerUserResendOtpController);

export { router as registerUserRouter };
