import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuerController } from './controller/issuer.controller';
import { Issuer } from './entities/issuer.entity';
import { IssuerService } from './service/issuer.service';
@Module({
  imports: [TypeOrmModule.forFeature([Issuer])],
  controllers: [IssuerController],
  providers: [IssuerService],
})
export class IssuerModule {}
