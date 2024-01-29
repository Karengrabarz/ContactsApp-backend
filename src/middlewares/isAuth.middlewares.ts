import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const isAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).json({ message: "Invalid token" })
    }

    const token = authorization.split(" ")[1]
    
    verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
        if (error) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        res.locals.clientId = decoded.sub
        return next()
    })
}