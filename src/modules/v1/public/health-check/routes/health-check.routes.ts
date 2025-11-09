import { Router } from 'express';
import { getHealthCheckDataController } from '../controllers/index.js';

const router = Router();

// GET /api/v1/health
// Returns system health information (CPU, memory, disk, network, etc.)
router.get('/', getHealthCheckDataController);

export { router as healthCheckRouter };
