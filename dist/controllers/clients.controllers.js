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
exports.ClientController = void 0;
class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    createClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClient = yield this.clientService.createClient(req.body);
            console.log(req.body);
            return res.status(201).json(newClient);
        });
    }
    // async readClients(req:Request, res: Response){
    //     const clients = await this.clientService.readClients()
    //     return res.status(200).json(clients)
    // }
    retriveClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.clientService.retriveClient(res.locals.clientId);
            return res.status(200).json(client);
        });
    }
    updateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.clientService.updateClient(res.locals.clientId, req.body);
            return res.status(200).json(client);
        });
    }
    deleteClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.clientService.deleteClient(res.locals.clientId);
            return res.status(204).send();
        });
    }
}
exports.ClientController = ClientController;
