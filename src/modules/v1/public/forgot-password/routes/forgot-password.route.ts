import { ResponseMessage } from '@/constants';
import { successResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => successResponse<{}>(res, 200, {}, ResponseMessage.THERE_IS_NO_PLACE));
router.get('/verify-otp', (req, res) => successResponse<{}>(res, 200, {}, ResponseMessage.THERE_IS_NO_PLACE));
router.get('/reset', (req, res) => successResponse<{}>(res, 200, {}, ResponseMessage.THERE_IS_NO_PLACE));

export { router as forgotPasswordRouter };
