import { validateQuery } from "@/middlewares";
import { Router } from "express";
import { redirectQuerySchema } from "../validations";
import { redirectController } from "../controllers";

const router = Router()

router.get('/', validateQuery(redirectQuerySchema), redirectController)

export { router as redirectRouter }