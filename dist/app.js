"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("express-async-errors");
const express_1 = __importStar(require("express"));
const clients_routes_1 = require("./routes/clients.routes");
const contacts_router_1 = require("./routes/contacts.router");
const errors_middlewares_1 = require("./errors/errors.middlewares");
const helmet_1 = __importDefault(require("helmet"));
const session_routes_1 = require("./routes/session.routes");
const isAuth_middlewares_1 = require("./middlewares/isAuth.middlewares");
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
exports.app.use((0, helmet_1.default)());
exports.app.use((0, express_1.json)());
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
const globalErros = new errors_middlewares_1.GlobalErrors();
exports.app.use('/clients', clients_routes_1.clientsRouter);
exports.app.use('/contacts', isAuth_middlewares_1.isAuthMiddleware, contacts_router_1.contactsRouter);
exports.app.use('/login', session_routes_1.loginRouter);
exports.app.use(globalErros.handleErrors);
