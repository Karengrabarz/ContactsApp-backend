"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsRouter = void 0;
const express_1 = require("express");
const clients_middlewares_1 = require("../middlewares/clients.middlewares");
const errors_middlewares_1 = require("../errors/errors.middlewares");
const clients_schemas_1 = require("../schemas/clients.schemas");
const controllers_1 = require("../controllers");
const isAuth_middlewares_1 = require("../middlewares/isAuth.middlewares");
exports.clientsRouter = (0, express_1.Router)();
const clientMiddlewares = new clients_middlewares_1.ClientMiddlewares();
const globalErrors = new errors_middlewares_1.GlobalErrors();
exports.clientsRouter.post('/', globalErrors.validateBody(clients_schemas_1.clientCreateSchema), clientMiddlewares.checkClientEmail, (req, res) => controllers_1.clientController.createClient(req, res));
// clientsRouter.get('/',(req,res)=>clientController.readClients(req,res))
// clientsRouter.use('/:id', clientMiddlewares.checkClientId,isAuthMiddleware,clientMiddlewares.isOwner )
exports.clientsRouter.get('/', isAuth_middlewares_1.isAuthMiddleware, (req, res) => controllers_1.clientController.retriveClient(req, res));
exports.clientsRouter.patch('/', isAuth_middlewares_1.isAuthMiddleware, globalErrors.validateBody(clients_schemas_1.clientUpdateSchema), clientMiddlewares.checkClientEmail, (req, res) => controllers_1.clientController.updateClient(req, res));
exports.clientsRouter.delete('/', isAuth_middlewares_1.isAuthMiddleware, (req, res) => controllers_1.clientController.deleteClient(req, res));
