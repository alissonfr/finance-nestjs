/*
  src/seed/seed.module.ts
*/

import { NestFactory } from "@nestjs/core";
import { SeedService } from "./seed.service";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbOptions } from "../data-source";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
        }),
        TypeOrmModule.forRoot(dbOptions),
    ],
    providers: [SeedService],
    exports: [SeedService],
})
class SeedModule {}

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const seeder = appContext.get(SeedService);
  await seeder.run();
  await appContext.close();
}

bootstrap().catch(error => {
  console.error('Seeding failed:', error);
  process.exit(1);
});