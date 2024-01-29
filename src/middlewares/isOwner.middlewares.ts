import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Contact } from "../entities/contacts.entity"
import { AppError } from "../errors/AppError"

export const isOwnerMiddleware = async (req:Request, res:Response,next: NextFunction )=>{
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