import { Request, Response } from "express";
import { ContactService } from "../services/contacts.services";

export class ContactController {
    constructor(private contactService : ContactService){}
    async createContact(req:Request, res: Response) {
        const clientId = res.locals.clientId
        const newContact = await this.contactService.createContact(req.body, clientId)
        return res.status(201).json(newContact)
    }
    async readContacts(req:Request, res: Response){
        const clientId = res.locals.clientId
        const contacts = await this.contactService.readContacts(clientId)
        return res.status(200).json(contacts)
    }
    async retriveContact(req:Request, res: Response){
        const contact = await this.contactService.retriveContact(req.params.contactId)
        return res.status(200).json(contact);
    }
    async updateContact(req: Request, res: Response){
        const contact =  await this.contactService.updateContact(req.params.id, req.body)
        return res.status(200).json(contact)
    }
    async deleteContact(req: Request, res: Response){
        const contact = await this.contactService.deleteContact(req.params.contactId)
        return res.status(204).send()
    }
}