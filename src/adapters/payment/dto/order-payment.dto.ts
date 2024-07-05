import { ApiProperty } from "@nestjs/swagger";

export class OrderPaymentDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    client: string;

    @ApiProperty()
    orderId: string
}