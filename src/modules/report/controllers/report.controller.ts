import { BadRequestException, Controller, Get, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard"
import { FinancialReportDTO } from "../dtos/financial-report.dto"
import { ReportService } from "../services/report.service"

@Controller("reports")
@ApiTags("reports")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ReportController {
    constructor(private readonly service: ReportService) {}

    @Get()
    @ApiQuery({
        name: "year",
        required: true,
        description: "Ano do relatório financeiro",
        example: "2025",
    })
    @ApiQuery({
        name: "month",
        required: true,
        description: "Mês do relatório financeiro (formato MM)",
        example: "06",
    })
    async getFinancialReport(@Query("year") year: string, @Query("month") month: string): Promise<FinancialReportDTO> {
        if (!year || !month) {
            throw new BadRequestException("Ano e mês são obrigatórios.")
        }

        return this.service.getFinancialReport({ year, month })
    }
}
