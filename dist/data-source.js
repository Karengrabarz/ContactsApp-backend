"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const dataSourceConfig = () => {
    const entitiesPath = path_1.default.join(__dirname, './entities/**.{ts,js}');
    const migrationsPath = path_1.default.join(__dirname, './migrations/**.{ts,js}');
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl)
        throw new Error("Missing env var: 'DATABASE_URL'");
    return {
        type: 'postgres',
        url: databaseUrl,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    };
};
exports.AppDataSource = new typeorm_1.DataSource(dataSourceConfig());
