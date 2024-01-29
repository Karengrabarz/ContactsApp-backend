import { z } from "zod";

const contactSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    telefone: z.number(),
    createdAt: z.date(),
})

const contactCreateSchema = contactSchema.omit({
    id: true,
    createdAt: true,

})

const contactUpdateSchema = contactCreateSchema.partial()
const contactsArraySchema = contactSchema.array()

export {contactSchema, contactCreateSchema, contactUpdateSchema, contactsArraySchema}