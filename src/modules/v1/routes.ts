import swaggerUi from 'swagger-ui-express';
import { RequestHandler, Router } from 'express';
import { publicRouter } from './public/routes';
import { userRouter } from './user/routes';
import { adminRouter } from './admin/routes';
import { userAuthMiddleware } from '@/middlewares/auth/user-auth.middleware';
import { swaggerDocument, ENV } from '@/config';

const router = Router();

// public routes ( everyone access )
router.use('/public', publicRouter);

// user routes ( need to login to access )
router.use('/user', userAuthMiddleware as unknown as RequestHandler, userRouter as unknown as RequestHandler);
// admin routes ( need to login with admin access )
router.use('/admin', adminRouter);

// __________ VERSION 1 | API DOCUMENTION __________
if (ENV.SWAGGER_ENABLED) {
  router.use(ENV.SWAGGER_URL || '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customSiteTitle: 'Miora Api V1 | Docuemention', customCssUrl: '/swagger-assets/swagger-dark-ui.css', }));
}

export { router as v1Router };
