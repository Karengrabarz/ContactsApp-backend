"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrors = void 0;
const AppError_1 = require("./AppError");
const zod_1 = require("zod");
class GlobalErrors {
    constructor() {
        this.handleErrors = (err, req, res, next) => {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            if (err instanceof zod_1.ZodError) {
                return res.status(409).json(err);
            }
            return res.status(500).json({ error: "Internal server error." });
        };
        this.validateBody = (schema) => {
            return (req, res, next) => {
                req.body = schema.parse(req.body);
                return next();
            };
        };
    }
}
exports.GlobalErrors = GlobalErrors;
