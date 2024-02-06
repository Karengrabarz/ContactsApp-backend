"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUpdateSchema = exports.contactCreateSchema = exports.contactSchema = exports.contactUpdateSchemaReturn = void 0;
const zod_1 = require("zod");
const contactSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    telefone: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    client: zod_1.z.object({
        id: zod_1.z.string()
    })
});
exports.contactSchema = contactSchema;
const contactCreateSchema = contactSchema.omit({
    id: true,
    createdAt: true,
    client: true
});
exports.contactCreateSchema = contactCreateSchema;
const contactUpdateSchema = contactSchema.pick({
    name: true,
    email: true,
    telefone: true
}).partial();
exports.contactUpdateSchema = contactUpdateSchema;
const contactUpdateSchemaReturn = contactSchema.omit({
    client: true
});
exports.contactUpdateSchemaReturn = contactUpdateSchemaReturn;
