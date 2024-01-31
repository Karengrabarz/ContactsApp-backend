import { AnyZodObject, TypeOf, z } from "zod";
import {  clientCreateReturnSchema, clientCreateSchema, clientSchema, clientSchemaResponse, clientUpdateSchema, clientsArraySchema, readAllClientsSchema } from "../schemas/clients.schemas";
import { DeepPartial } from "typeorm";

type TClient = z.infer<typeof clientSchema>
type TClientCreate = z.infer<typeof clientCreateSchema>
type TClientCreateReturn = z.infer<typeof clientCreateReturnSchema >
type TClientUpdate = DeepPartial<TClientCreate>
type TClientsArray = z.infer<typeof clientsArraySchema>
type TReadAllClients = z.infer<typeof readAllClientsSchema>
type TClientsResponse = z.infer<typeof clientSchemaResponse>

export{TReadAllClients, TClientCreateReturn, TClient, TClientCreate, TClientUpdate, TClientsArray, TClientsResponse}