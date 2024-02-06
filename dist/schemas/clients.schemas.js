"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSchemaResponse = exports.clientsArraySchema = exports.clientUpdateSchema = exports.clientCreateSchema = exports.clientSchema = exports.clientCreateReturnSchema = exports.readAllClientsSchema = void 0;
const zod_1 = require("zod");
const clientSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    telefone: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    contacts: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        telefone: zod_1.z.string(),
        createdAt: zod_1.z.date(),
    }).array(),
});
exports.clientSchema = clientSchema;
const clientCreateReturnSchema = clientSchema.pick({
    id: true,
    name: true,
    email: true,
    telefone: true,
    createdAt: true
});
exports.clientCreateReturnSchema = clientCreateReturnSchema;
const clientCreateSchema = clientSchema.pick({
    name: true,
    email: true,
    password: true,
    telefone: true
});
exports.clientCreateSchema = clientCreateSchema;
const clientSchemaResponse = clientSchema.omit({
    password: true
});
exports.clientSchemaResponse = clientSchemaResponse;
const clientUpdateSchema = clientSchema.pick({
    name: true,
    email: true,
    password: true,
    telefone: true
}).partial();
exports.clientUpdateSchema = clientUpdateSchema;
const clientsArraySchema = clientCreateReturnSchema.array();
exports.clientsArraySchema = clientsArraySchema;
const readAllClientsSchema = clientCreateReturnSchema.array();
exports.readAllClientsSchema = readAllClientsSchema;
