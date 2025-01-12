import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'
import { FinancialReportDTO } from '../dtos/financial-report.dto'
import { ReportService } from '../services/report.service'

@Controller('reports')
@ApiTags('reports')
export class ReportController {
  constructor(private readonly service: ReportService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFinancialReport(
    @Query('year') year: string,
    @Query('month') month: string,
  ): Promise<FinancialReportDTO> {
    if (!year || !month) {
      throw new BadRequestException('Ano e mês são obrigatórios.')
    }

    return this.service.getFinancialReport({ year, month })
  }
}
