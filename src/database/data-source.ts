import { config } from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm"

import * as fs from "fs"
import * as path from "path"

const NODE_ENV = process.env.NODE_ENV
const ENV_FILE = path.resolve(process.cwd(), `.env.${NODE_ENV || "local"}`)
config({ path: ENV_FILE })

export const dbOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + "/../modules/**/entities/*.entity.{ts,js}"],
    migrations: [__dirname + "/migrations/*.{ts,js}"],
    synchronize: false, // nunca true em prod
    ssl:
        NODE_ENV === "prod"
            ? {
                  ca: fs.readFileSync(path.resolve(__dirname, "global-bundle.pem")).toString(),
              }
            : false,
}

export const AppDataSource = new DataSource(dbOptions)
