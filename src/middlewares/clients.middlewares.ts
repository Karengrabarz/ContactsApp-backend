import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/AppError";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";

export class ClientMiddlewares {
    async checkClientId(req:Request, res:Response,next: NextFunction ){
        const clientId = req.params.id;
        const clientRepository = AppDataSource.getRepository(Client)
        const foundClient = await clientRepository.findOne({
            where: {id:clientId}
        })

        if (!foundClient) {
            throw new AppError(404,"Client not found")
        }
       
        res.locals.foundClient = foundClient
        res.locals.foundClientId = foundClient.id
        return next()
    }
    async checkClientEmail(req:Request, res:Response,next: NextFunction ){
        const {email} = req.body
        if(!email){
            return next()
        }

        const clientRepository = AppDataSource.getRepository(Client)
        const foundEmail = await clientRepository.findOne({
            where: {email}
        })
        if (foundEmail){
            throw new AppError(409, "Email already exists.");
        }
        return next()
    }
    // async isOwner(req:Request, res:Response,next: NextFunction ){
    //     const contactRepository = AppDataSource.getRepository(Client)
    //     const client = req.params.id
    //     const clientId = res.locals.foundClient.id
    //     const clientObj  = await contactRepository.findOne({
    //         where: {
    //             id: clientId
    //         }
    //     })
    
    //     if (!clientObj) {
    //         throw new AppError(404,"Client not found")
    //     }
    
    //     if (client !== clientId) {
    //         throw new AppError(403,"You don't have permissions")
    //     }
    //     return next()
    // }
}