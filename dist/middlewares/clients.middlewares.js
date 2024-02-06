"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMiddlewares = void 0;
const AppError_1 = require("../errors/AppError");
const data_source_1 = require("../data-source");
const client_entity_1 = require("../entities/client.entity");
class ClientMiddlewares {
    checkClientId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientId = req.params.id;
            const clientRepository = data_source_1.AppDataSource.getRepository(client_entity_1.Client);
            const foundClient = yield clientRepository.findOne({
                where: { id: clientId }
            });
            if (!foundClient) {
                throw new AppError_1.AppError(404, "Client not found");
            }
            res.locals.foundClient = foundClient;
            res.locals.foundClientId = foundClient.id;
            return next();
        });
    }
    checkClientEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            if (!email) {
                return next();
            }
            const clientRepository = data_source_1.AppDataSource.getRepository(client_entity_1.Client);
            const foundEmail = yield clientRepository.findOne({
                where: { email }
            });
            if (foundEmail) {
                throw new AppError_1.AppError(409, "Email already exists.");
            }
            return next();
        });
    }
}
exports.ClientMiddlewares = ClientMiddlewares;
