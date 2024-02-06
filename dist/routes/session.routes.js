"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const errors_middlewares_1 = require("../errors/errors.middlewares");
const session_schema_1 = require("../schemas/session.schema");
const globalErrors = new errors_middlewares_1.GlobalErrors();
exports.loginRouter = (0, express_1.Router)();
exports.loginRouter.post("/", globalErrors.validateBody(session_schema_1.sessionSchema), (req, res) => controllers_1.sessionController.login(req, res));
