"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const token = authorization.split(" ")[1];
    (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }
        res.locals.clientId = decoded.sub;
        return next();
    });
};
exports.isAuthMiddleware = isAuthMiddleware;
