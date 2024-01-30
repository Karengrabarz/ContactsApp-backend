import { AnyZodObject, TypeOf, z } from "zod";
import {  clientCreateReturnSchema, clientCreateSchema, clientSchema, clientSchemaResponse, clientUpdateSchema, clientsArraySchema } from "../schemas/clients.schemas";
import { DeepPartial } from "typeorm";

type TClient = z.infer<typeof clientSchema>
type TClientCreate = z.infer<typeof clientCreateSchema>
type TClientCreateReturn = z.infer<typeof clientCreateReturnSchema >
type TClientUpdate = DeepPartial<TClientCreate>
type TClientsArray = z.infer<typeof clientsArraySchema>
type TClientsResponse = z.infer<typeof clientSchemaResponse>
interface ErrorMsg{
    error:string;
}
interface ClientMethods {
    create(data:TClientCreate):TClient;
    read():TClient[]
    retrive(clientId:number):TClient | ErrorMsg
    update(clientId:number, data: TClientUpdate):TClient | ErrorMsg
    delete(clientId:number):void | ErrorMsg
}
interface RequestSchema{
    params?: AnyZodObject
    body?: AnyZodObject
    query?: AnyZodObject
}
export{TClientCreateReturn, TClient, TClientCreate, TClientUpdate, ErrorMsg, ClientMethods, TClientsArray, TClientsResponse}