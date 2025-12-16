import { Router } from 'express';
import { authCheckController } from '../controllers';

const router = Router();

router.get('/', authCheckController);

export { router as authCheckRouter };
