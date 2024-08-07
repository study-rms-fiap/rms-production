import { ApiProperty } from "@nestjs/swagger"

export class ProcessPaymentDto {
    @ApiProperty()
    paymentId: string

    @ApiProperty()
    status: number
}