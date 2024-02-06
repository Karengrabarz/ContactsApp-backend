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
exports.ContactService = void 0;
const data_source_1 = require("../data-source");
const AppError_1 = require("../errors/AppError");
const contacts_entity_1 = require("../entities/contacts.entity");
const contacts_schemas_1 = require("../schemas/contacts.schemas");
const client_entity_1 = require("../entities/client.entity");
class ContactService {
    createContact(data, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientRepository = data_source_1.AppDataSource.getRepository(client_entity_1.Client);
            const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entity_1.Contact);
            const client = yield clientRepository.findOne({
                where: {
                    id: clientId
                }
            });
            if (!client) {
                throw new AppError_1.AppError(404, "Client not found");
            }
            const contact = contactRepository.create(Object.assign(Object.assign({}, data), { client: { id: clientId } }));
            yield contactRepository.save(contact);
            return contact;
        });
    }
    retriveContact(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entity_1.Contact);
            const foundContact = yield contactRepository.findOne({
                where: { id: contactId }
            });
            if (!foundContact) {
                throw new AppError_1.AppError(404, 'Contact not found');
            }
            return foundContact;
        });
    }
    updateContact(data, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entity_1.Contact);
            const foundContact = yield contactRepository.findOne({
                where: { id: contactId }
            });
            if (!foundContact) {
                throw new AppError_1.AppError(404, 'Contact not found');
            }
            const updatedContact = contactRepository.create(Object.assign(Object.assign({}, foundContact), data));
            yield contactRepository.save(updatedContact);
            return contacts_schemas_1.contactUpdateSchemaReturn.parse(updatedContact);
        });
    }
    deleteContact(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactRepository = data_source_1.AppDataSource.getRepository(contacts_entity_1.Contact);
            const foundContact = yield contactRepository.findOne({
                where: { id: contactId }
            });
            if (!foundContact) {
                throw new AppError_1.AppError(404, 'Contact not found');
            }
            yield contactRepository.remove(foundContact);
        });
    }
}
exports.ContactService = ContactService;
