import { Request, Response } from "express";

import crypto from "crypto";
import { TClient, TClientCreate, TClientResponse, TClientUpdate } from "../interfaces/clients.interfaces";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { AppError } from "../errors/AppError";
import { compare, hash } from "bcryptjs";
import { clientSchemaResponse, clientUpdateSchema, clientsArraySchema } from "../schemas/clients.schemas";
import { TloginRequest } from "../interfaces/login.interfaces";
import { sign } from "jsonwebtoken";

export class SessionService {
    async createToken(data:TloginRequest){
        const { email,password} = data
        const clientRepository = AppDataSource.getRepository(Client)
        const foundClient = await clientRepository.findOne({
            where: {
                email
            }
        })

        if (!foundClient) {
            throw new AppError(401,"Invalid credentials")
        }

        const isPasswordMatch = await compare(password, foundClient.password)
        if (!isPasswordMatch) {
            throw new AppError(401,"Invalid credentials")
        }
        const token = sign({name: foundClient.name},process.env.SECRET_KEY!,{expiresIn:'1y', subject:foundClient.id})
    
        return token
    }
}