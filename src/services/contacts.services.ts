
import { AppDataSource } from "../data-source";

import { AppError } from "../errors/AppError";
import { TContact, TContactCreate, TContactUpdate, TContactUpdateReturn } from "../interfaces/contacts.interfaces";
import { Contact } from "../entities/contacts.entity";
import { contactUpdateSchemaReturn } from "../schemas/contacts.schemas";
import { Client } from "../entities/client.entity";


export class ContactService {
    async createContact(data:TContactCreate, clientId:string): Promise<TContact>{
        const clientRepository = AppDataSource.getRepository(Client)
        const contactRepository = AppDataSource.getRepository(Contact)
        const client = await clientRepository.findOne({
            where: {
                id:clientId
            }
        })
        if (!client) {
            throw new AppError(404,"Client not found")
        }

        const contact = contactRepository.create({
            ...data,
            client:{id:clientId}
        })
        await contactRepository.save(contact)
        return contact
    }

    async retriveContact(contactId:string):Promise<TContact> {
        const contactRepository = AppDataSource.getRepository(Contact)
        const foundContact = await contactRepository.findOne({
            where: {id:contactId}
        })
        if(!foundContact){
            throw new AppError(404,'Contact not found')
        }
        return foundContact   
    }
    async updateContact(data:TContactUpdate, contactId:string):Promise<TContactUpdateReturn> {
        const contactRepository = AppDataSource.getRepository(Contact)
        const foundContact = await contactRepository.findOne({
            where: {id:contactId}
        })
        if(!foundContact){
            throw new AppError(404,'Contact not found')
        }
        const updatedContact = contactRepository.create({
            ...foundContact,
            ...data
        })
        await contactRepository.save(updatedContact)
        return contactUpdateSchemaReturn.parse(updatedContact)
    }
    async deleteContact(contactId:string):Promise<void> {
        const contactRepository = AppDataSource.getRepository(Contact)
        const foundContact = await contactRepository.findOne({
            where: {id:contactId}
        })
        if(!foundContact){
            throw new AppError(404,'Contact not found')
        }
        await contactRepository.remove(foundContact)
    }
}
