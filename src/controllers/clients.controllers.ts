import { Request, Response } from "express";
import { ClientService } from "../services/clients.services";

export class ClientController {
    constructor(private clientService : ClientService){}
    async createClient(req:Request, res: Response) {
        const newClient = await this.clientService.createClient(req.body)
        return res.status(201).json(newClient)
    }

    async retriveClient(req:Request, res: Response){
        const client = await this.clientService.retriveClient(res.locals.clientId)
        return res.status(200).json(client);
    }
    async updateClient(req: Request, res: Response){
        const client =  await this.clientService.updateClient(res.locals.clientId, req.body)
        return res.status(200).json(client)
    }
    async deleteClient(req: Request, res: Response){
        const client = await this.clientService.deleteClient(res.locals.clientId)
        return res.status(204).send()
    }
}

