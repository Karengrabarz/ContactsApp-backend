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
exports.SessionService = void 0;
const data_source_1 = require("../data-source");
const client_entity_1 = require("../entities/client.entity");
const AppError_1 = require("../errors/AppError");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class SessionService {
    createToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const clientRepository = data_source_1.AppDataSource.getRepository(client_entity_1.Client);
            const foundClient = yield clientRepository.findOne({
                where: {
                    email
                }
            });
            if (!foundClient) {
                throw new AppError_1.AppError(401, "Invalid credentials");
            }
            const isPasswordMatch = yield (0, bcryptjs_1.compare)(password, foundClient.password);
            if (!isPasswordMatch) {
                throw new AppError_1.AppError(401, "Invalid credentials");
            }
            const token = (0, jsonwebtoken_1.sign)({ name: foundClient.name }, process.env.SECRET_KEY, { expiresIn: '1y', subject: foundClient.id });
            return token;
        });
    }
}
exports.SessionService = SessionService;
