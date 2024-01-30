import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contacts.entity";

export class ContactMiddlewares {
    async checkContactId(req:Request, res:Response,next: NextFunction ){
        const contactRepository = AppDataSource.getRepository(Contact)
        const foundContact = await contactRepository.findOne({
            where: {id:(req.params.contactId)}
        })

        // if (foundContact) {
        //     throw new AppError(409,"Contact already exists")
        // }
        res.locals = {...res.locals, foundContact}
        return next()
    }
    async checkContactEmail(req:Request, res:Response,next: NextFunction ){
        const {email} = req.body
        if(!email){
            return next()
        }

        const contactRepository = AppDataSource.getRepository(Contact)
        const foundEmail = await contactRepository.findOne({
            where: {email}
        })
        if (foundEmail){
            throw new AppError(409, "Email already exists.");
        }
        return next()
    }
    async isOwner(req:Request, res:Response,next: NextFunction ){
        const contactRepository = AppDataSource.getRepository(Contact)
        const contactId = req.params.id
        const clientId = res.locals.clientId
        const contact = await contactRepository.findOne({
            where: {
                id: contactId
            },
            relations: {
                client: true
            }
        })
    
        if (!contact) {
            throw new AppError(404,"Contact not found")
        }
    
        if (contact.client.id !== clientId) {
            throw new AppError(403,"You don't have permissions")
        }
        return next()
    }
}