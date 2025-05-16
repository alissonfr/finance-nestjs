import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { dbOptions } from './options';

config();

const env = process.env.NODE_ENV || 'local';
config({ path: `.env.${env}` });

export const AppDataSource = new DataSource(dbOptions);
