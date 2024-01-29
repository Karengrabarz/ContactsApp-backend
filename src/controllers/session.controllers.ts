import { Request, Response } from "express";
import { ClientService } from "../services/clients.services";
import { SessionService } from "../services/session.services";

export class SessionController {
    constructor(private sessionService : SessionService){}
    async login(req:Request, res: Response) {
        const token = await this.sessionService.createToken(req.body)
        return res.json({token})
    }
}