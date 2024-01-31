import { z } from "zod";

const clientSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    telefone: z.number(),
    createdAt: z.date(),
    contacts: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        telefone: z.number(),
        createdAt: z.date(),
    }).array(),
})
const clientCreateReturnSchema = clientSchema.pick({
    id:true,
    name:true,
    email:true,
    telefone: true,
    createdAt: true
})
const clientCreateSchema = clientSchema.pick({
    name:true,
    email:true,
    password: true,
    telefone: true

})
const clientSchemaResponse = clientSchema.omit({
    password:true
})

const clientUpdateSchema = clientSchema.pick({
    name:true,
    email:true,
    password: true,
    telefone: true

}).partial()

const clientsArraySchema = clientCreateReturnSchema.array()
const readAllClientsSchema = clientCreateReturnSchema.array()
export {readAllClientsSchema, clientCreateReturnSchema,clientSchema, clientCreateSchema, clientUpdateSchema,clientsArraySchema, clientSchemaResponse}