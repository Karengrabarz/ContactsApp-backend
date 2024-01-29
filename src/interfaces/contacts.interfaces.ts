import { z } from "zod";
import { contactCreateSchema, contactSchema, contactUpdateSchema, contactsArraySchema } from "../schemas/contacts.schemas";
import { DeepPartial } from "typeorm";

type TContact = z.infer<typeof contactSchema>
type TContactCreate = z.infer<typeof contactCreateSchema>
type TContactUpdate = DeepPartial<TContactCreate>
type TContactsArray = z.infer<typeof contactsArraySchema>
interface ErrorMsg{
    error:string;
}
interface ContactMethods {
    create(data:TContactCreate):TContact;
    read():TContact[]
    retrive(contactId:number):TContact | ErrorMsg
    update(contactId:number, data: TContactUpdate):TContact | ErrorMsg
    delete(contactId:number):void | ErrorMsg
}

export{TContact, TContactCreate, TContactUpdate, ErrorMsg, ContactMethods, TContactsArray}