
import { AppDataSource } from "../data-source";

import { AppError } from "../errors/AppError";
import { hash } from "bcryptjs";
import { TContact, TContactCreate, TContactUpdate, TContactsArray } from "../interfaces/contacts.interfaces";
import { Contact } from "../entities/contacts.entity";
import { contactSchema, contactUpdateSchema, contactsArraySchema } from "../schemas/contacts.schemas";
import { Client } from "../entities/client.entity";
import { AnyBulkWriteOperation } from "typeorm";


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
            client
        })
        await contactRepository.save(contact)
        return contactSchema.parse(contact)
    }
    async readContacts(clientId:string):Promise<TContactsArray>{
        const clientRepository = AppDataSource.getRepository(Client)
        const contactRepository = AppDataSource.getRepository(Contact)
        const client = await clientRepository.findOne({
            where: {
                id:clientId
            }, relations:{
                contacts: true
            }
        })
        if (!client) {
            throw new AppError(404,"Client not found")
        }
        
        return contactsArraySchema.parse(client.contacts)
    }
    async retriveContact(contactId:string) {
        const contactRepository = AppDataSource.getRepository(Contact)
        const foundContact = await contactRepository.findOne({
            where: {id:contactId}
        })
        if(!foundContact){
            throw new AppError(404,'Contact not found')
        }
        return foundContact   
    }
    async updateContact(data:any, contactId:string):Promise<any> {
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
        return contactUpdateSchema.parse(updatedContact)
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
