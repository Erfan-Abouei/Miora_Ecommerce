import { Router } from 'express';
import { logoutUserController } from '../controllers';

const router = Router();

router.get('/', logoutUserController);

export { router as logoutUserRouter };
