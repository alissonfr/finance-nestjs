import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

import * as path from 'path';
import * as fs from 'fs';

const envFile = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'local'}`);
config({ path: envFile });

export const dbOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../modules/**/entities/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false, // nunca true em prod
  ssl: {
    ca: fs.readFileSync(path.resolve(__dirname, 'global-bundle.pem')).toString(),
  },
};

export const AppDataSource = new DataSource(dbOptions);
