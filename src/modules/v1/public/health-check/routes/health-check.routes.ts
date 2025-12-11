import { Router } from 'express';
import { getHealthCheckDataController } from '../controllers/index';

const router = Router();

router.get('/', getHealthCheckDataController);

export { router as healthCheckRouter };
