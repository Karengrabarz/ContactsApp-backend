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
exports.ContactMiddlewares = void 0;
const AppError_1 = require("../errors/AppError");
const data_source_1 = require("../data-source");
const contacts_entity_1 = require("../entities/contacts.entity");
class ContactMiddlewares {
    checkContactId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entity_1.Contact);
            const foundContact = yield contactRepository.findOne({
                where: { id: (req.params.id) }
            });
            res.locals = Object.assign(Object.assign({}, res.locals), { foundContact });
            return next();
        });
    }
    checkContactEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            if (!email) {
                return next();
            }
            const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entity_1.Contact);
            const foundEmail = yield contactRepository.findOne({
                where: { email }
            });
            if (foundEmail) {
                throw new AppError_1.AppError(409, "Email already exists.");
            }
            return next();
        });
    }
    isOwner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entity_1.Contact);
            const contactId = req.params.id;
            const clientId = res.locals.clientId;
            console.log(clientId, 'esse eh o locals clientId');
            const contact = yield contactRepository.findOne({
                where: {
                    id: contactId
                },
                relations: {
                    client: true
                }
            });
            if (!contact) {
                throw new AppError_1.AppError(404, "Contact not found");
            }
            if (contact.client.id !== clientId) {
                throw new AppError_1.AppError(403, "You don't have permissions");
            }
            return next();
        });
    }
}
exports.ContactMiddlewares = ContactMiddlewares;
