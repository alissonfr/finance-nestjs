import { Controller, Get, Param, Query } from '@nestjs/common';
import { IssuerService } from '../service/issuer.service';

@Controller('issuers')
export class IssuerController {
  constructor(private readonly issuerService: IssuerService) {}

  @Get()
  find(@Query('name') name?: string) {
    return this.issuerService.find(name);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.issuerService.findOne(id);
  }
}
