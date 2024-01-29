import { Request, Response } from "express";
import { ClientService } from "../services/clients.services";

export class ClientController {
    constructor(private clientService : ClientService){}
    async createClient(req:Request, res: Response) {
        const newClient = await this.clientService.createClient(req.body)
        return res.status(201).json(newClient)
    }
    async readClients(req:Request, res: Response){
        const clients = await this.clientService.readClients()
        return res.status(200).json(clients)
    }
    async retriveClient(req:Request, res: Response){
        const client = await this.clientService.retriveClient(req.params.clientId)
        return res.status(200).json(client);
    }
    async updateClient(req: Request, res: Response){
        const client =  await this.clientService.updateClient(req.params.clientId, req.body)
        return res.status(200).json(client)
    }
    async deleteClient(req: Request, res: Response){
        const client = await this.clientService.deleteClient(req.params.clientId)
        return res.status(204).send()
    }
}

