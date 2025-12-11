import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import { publicRouter } from './public/routes';
import { userRouter } from './user/routes';
import { adminRouter } from './admin/routes';
import { userAuthMiddleware } from '@/middlewares/auth/user-auth.middleware';
import { swaggerDocument } from '@/config/swagger/swagger.config';
import { ENV } from '@/config';

const router = Router();

// public routes ( everyone access )
router.use('/public', publicRouter);

// user routes ( need to login to access )
router.use('/user', userAuthMiddleware, userRouter);

// admin routes ( need to login with admin access )
router.use('/admin', adminRouter);

// __________ VERSION 1 | API DOCUMENTION __________
if (ENV.SWAGGER_ENABLED) {
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customSiteTitle: 'Miora Api V1 | Docuemention' }));
}

export { router as v1Router };
