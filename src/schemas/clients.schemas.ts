import { z } from "zod";

const clientSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    telefone: z.number(),
    createdAt: z.date(),
})

const clientCreateSchema = clientSchema.omit({
    id: true,
    createdAt: true,

})
const clientSchemaResponse = clientSchema.omit({
    password:true
})

const clientUpdateSchema = clientCreateSchema.partial()

const clientsArraySchema = clientSchemaResponse.array()

export {clientSchema, clientCreateSchema, clientUpdateSchema,clientsArraySchema, clientSchemaResponse}