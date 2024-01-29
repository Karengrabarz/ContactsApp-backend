import {Request, Response, Router } from "express";

import { ContactMiddlewares } from "../middlewares/contacts.middlewares";
import { GlobalErrors } from "../errors/errors.middlewares";
import { contactCreateSchema, contactUpdateSchema } from "../schemas/contacts.schemas";
import { contactController } from "../controllers";
import { isOwnerMiddleware } from "../middlewares/isOwner.middlewares";

export const contactsRouter = Router();

const contactMiddlewares = new ContactMiddlewares()
const globalErrors = new GlobalErrors()

contactsRouter.post('/',globalErrors.validateBody(contactCreateSchema),contactMiddlewares.checkContactEmail, (req: Request, res: Response) => contactController.createContact(req,res))
contactsRouter.get('/',(req,res)=>contactController.readContacts(req,res))

contactsRouter.use('/:id', contactMiddlewares.checkContactId )

contactsRouter.get('/:id',(req,res)=>contactController.retriveContact(req,res))
contactsRouter.patch('/:id',globalErrors.validateBody(contactUpdateSchema),isOwnerMiddleware,contactMiddlewares.checkContactEmail,(req,res)=>contactController.updateContact(req,res))
contactsRouter.delete('/:id',isOwnerMiddleware, (req,res)=>contactController.deleteContact(req,res))