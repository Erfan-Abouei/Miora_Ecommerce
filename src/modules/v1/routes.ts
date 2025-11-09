import publicRoutes from './public/routes.js';
import userRoutes from './user/routes.js';
import adminRoutes from './admin/routes.js';
import { Router } from 'express';

const v1Routes = Router();

// public routes ( everyone access )
v1Routes.use('/public', publicRoutes);

// user routes ( need to login to access )
v1Routes.use('/user', userRoutes);

// admin routes ( need to login with admin access )
v1Routes.use('/admin', adminRoutes);

export default v1Routes;
