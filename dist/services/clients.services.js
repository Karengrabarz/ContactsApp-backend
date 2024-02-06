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
exports.ClientService = void 0;
const data_source_1 = require("../data-source");
const client_entity_1 = require("../entities/client.entity");
const AppError_1 = require("../errors/AppError");
const bcryptjs_1 = require("bcryptjs");
const clients_schemas_1 = require("../schemas/clients.schemas");
class ClientService {
    createClient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            const { email, name, password, telefone } = data;
            const clientRepository = data_source_1.AppDataSource.getRepository(client_entity_1.Client);
            const foundClient = yield clientRepository.findOne({
                where: {
                    email
                }
            });
            if (foundClient) {
                throw new AppError_1.AppError(409, "Email already exists");
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
            const client = clientRepository.create({
                name, email, password: hashedPassword, telefone
            });
            yield clientRepository.save(client);
            return clients_schemas_1.clientCreateReturnSchema.parse(client);
        });
    }
    readClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const clientRepository = data_source_1.AppDataSource.getRepository(client_entity_1.Client);
            const clients = yield clientRepository.find();
            return clients_schemas_1.readAllClientsSchema.parse(clients);
        });
    }
    retriveClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(clientId, "id service");
            const clientRepository = data_source_1.AppDataSource.getRepository(client_entity_1.Client);
            const foundClient = yield clientRepository.findOne({
                where: { id: clientId },
                relations: {
                    contacts: true
                }
            });
            console.log(foundClient);
            if (!foundClient) {
                throw new AppError_1.AppError(404, 'Client not found');
            }
            return clients_schemas_1.clientSchemaResponse.parse(foundClient);
        });
    }
    updateClient(clientId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientRepository = data_source_1.AppDataSource.getRepository(client_entity_1.Client);
            const foundClient = yield clientRepository.findOne({
                where: { id: clientId }
            });
            if (!foundClient) {
                throw new AppError_1.AppError(404, 'Client not found');
            }
            if (data.password) {
                const hashedPassword = yield (0, bcryptjs_1.hash)(data.password, 10);
                data.password = hashedPassword;
            }
            const updateClient = clientRepository.create(Object.assign(Object.assign({}, foundClient), data));
            yield clientRepository.save(updateClient);
            return clients_schemas_1.clientCreateReturnSchema.parse(updateClient);
        });
    }
    deleteClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientRepository = data_source_1.AppDataSource.getRepository(client_entity_1.Client);
            const foundClient = yield clientRepository.findOne({
                where: { id: clientId }
            });
            if (!foundClient) {
                throw new AppError_1.AppError(404, 'Client not found');
            }
            yield clientRepository.remove(foundClient);
            return;
        });
    }
}
exports.ClientService = ClientService;
