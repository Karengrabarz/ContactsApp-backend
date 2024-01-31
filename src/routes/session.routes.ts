import { Router } from "express";
import { sessionController } from "../controllers";
import { GlobalErrors } from "../errors/errors.middlewares";
import { sessionSchema } from "../schemas/session.schema";

const globalErrors = new GlobalErrors()
export const loginRouter = Router();
loginRouter.post("/",globalErrors.validateBody(sessionSchema), (req, res) => sessionController.login(req, res))