import { Request, Response, Router } from "express";
import { ClientController } from "../controllers/clients.controllers";
import { ClientMiddlewares } from "../middlewares/clients.middlewares";
import { GlobalErrors } from "../errors/errors.middlewares";
import { clientCreateSchema, clientUpdateSchema } from "../schemas/clients.schemas";
import { clientController } from "../controllers";
import { isAuthMiddleware } from "../middlewares/isAuth.middlewares";

export const clientsRouter = Router();

const clientMiddlewares = new ClientMiddlewares()
const globalErrors = new GlobalErrors()

clientsRouter.post('/',globalErrors.validateBody(clientCreateSchema), clientMiddlewares.checkClientEmail, (req: Request, res: Response) => clientController.createClient(req,res))
// clientsRouter.get('/',(req,res)=>clientController.readClients(req,res))

// clientsRouter.use('/:id', clientMiddlewares.checkClientId,isAuthMiddleware,clientMiddlewares.isOwner )

clientsRouter.get('/',isAuthMiddleware,(req,res)=>clientController.retriveClient(req,res))
clientsRouter.patch('/',isAuthMiddleware,globalErrors.validateBody(clientUpdateSchema),clientMiddlewares.checkClientEmail, (req,res)=>clientController.updateClient(req,res))
clientsRouter.delete('/',isAuthMiddleware,(req,res)=>clientController.deleteClient(req,res))