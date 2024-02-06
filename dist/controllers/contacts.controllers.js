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
exports.ContactController = void 0;
class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    createContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientId = res.locals.clientId;
            const newContact = yield this.contactService.createContact(req.body, clientId);
            return res.status(201).json(newContact);
        });
    }
    retriveContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield this.contactService.retriveContact(req.params.id);
            return res.status(200).json(contact);
        });
    }
    updateContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield this.contactService.updateContact(req.body, req.params.id);
            return res.status(200).json(contact);
        });
    }
    deleteContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield this.contactService.deleteContact(req.params.id);
            return res.status(204).send();
        });
    }
}
exports.ContactController = ContactController;
