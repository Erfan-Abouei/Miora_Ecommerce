import { publicRouter } from './public/routes.js';
import { userRouter } from './user/routes.js';
import { adminRouter } from './admin/routes.js';
import { Router } from 'express';

const router = Router();

// public routes ( everyone access )
router.use('/public', publicRouter);

// user routes ( need to login to access )
router.use('/user', userRouter);

// admin routes ( need to login with admin access )
router.use('/admin', adminRouter);

export { router as v1Router };
