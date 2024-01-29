import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";
import { AnyZodObject, ZodError } from "zod";

export class GlobalErrors {
  handleErrors = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    if(err instanceof ZodError){
      return res.status(409).json(err)
    }

    return res.status(500).json({ error: "Internal server error." });
  };
  validateBody = (schema:AnyZodObject) => {
    return  (req: Request,
      res: Response,
      next: NextFunction) => {
        req.body = schema.parse(req.body)
        return next()
      }
  }
}