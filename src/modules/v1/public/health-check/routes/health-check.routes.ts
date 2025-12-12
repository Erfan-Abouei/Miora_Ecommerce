import { Router } from 'express';
import { getHealthCheckDataController } from '../controllers';

const router = Router();

router.get('/', getHealthCheckDataController);

export { router as healthCheckRouter };
