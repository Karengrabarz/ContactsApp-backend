import { z } from "zod";

const contactSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    telefone: z.string(),
    createdAt: z.date(),
    client:z.object({
        id:z.string()
    }) 
    
})

const contactCreateSchema = contactSchema.omit({
    id: true,
    createdAt: true,
    client: true

})

const contactUpdateSchema = contactSchema.pick({
    name: true,
    email:true,
    telefone: true
}).partial()

const contactUpdateSchemaReturn = contactSchema.omit({
    client:true
})


export {contactUpdateSchemaReturn, contactSchema, contactCreateSchema, contactUpdateSchema}