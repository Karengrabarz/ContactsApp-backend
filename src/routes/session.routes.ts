import { Router } from "express";
import { sessionController } from "../controllers";

export const loginRouter = Router();
loginRouter.post("/", (req, res) => sessionController.login(req, res))