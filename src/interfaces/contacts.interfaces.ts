import { z } from "zod";
import { contactCreateSchema, contactSchema,contactUpdateSchemaReturn} from "../schemas/contacts.schemas";
import { DeepPartial } from "typeorm";

type TContact = z.infer<typeof contactSchema>
type TContactCreate = z.infer<typeof contactCreateSchema>
type TContactUpdate = DeepPartial<TContactCreate>
type TContactUpdateReturn = z.infer<typeof contactUpdateSchemaReturn>

export{TContactUpdateReturn, TContact, TContactCreate, TContactUpdate}