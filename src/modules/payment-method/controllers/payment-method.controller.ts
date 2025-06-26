import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard"
import { PaymentMethod } from "../entities/payment-method.entity"
import { PaymentMethodService } from "../services/category.service"

@Controller("payment-methods")
@ApiTags("payment-methods")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PaymentMethodController {
    constructor(private readonly service: PaymentMethodService) {}

    @Get()
    @ApiQuery({
        name: "name",
        required: false,
        description: "Filtrar métodos de pagamento pelo nome",
        example: "Cartão de Crédito",
    })
    async find(@Query("name") name?: string): Promise<PaymentMethod[]> {
        return this.service.find({ name })
    }

    @Get(":categoryId")
    @ApiParam({
        name: "categoryId",
        type: Number,
        description: "ID do método de pagamento a ser buscado",
        example: 10,
    })
    async findOne(@Param("categoryId") categoryId: number): Promise<PaymentMethod> {
        return this.service.findOne(categoryId)
    }
}
