import { Router } from "express";
import { profileController } from "../controllers";

const router = Router()

router.get('/', profileController)

export { router as ProfileRouter }