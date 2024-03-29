import 'reflect-metadata'
import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm";
import path from 'path'

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}')
  const migrationsPath: string = path.join(__dirname, './migrations/**.{ts,js}')

  const databaseUrl: string | undefined = process.env.DATABASE_URL

  if (!databaseUrl) throw new Error("Missing env var: 'DATABASE_URL'")

  return {
    type: 'postgres',
    url: databaseUrl,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath]
  }
}

export const AppDataSource: DataSource = new DataSource(dataSourceConfig())