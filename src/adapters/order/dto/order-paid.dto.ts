import { ApiProperty } from '@nestjs/swagger';

class OrderItemsDto {
  @ApiProperty()
  product: string;
  @ApiProperty()
  quantity: number;
}

export class orderPaymentDto {
  @ApiProperty()
  orderRef: string;
  @ApiProperty()
  client: string;
  @ApiProperty({ type: [OrderItemsDto] })
  items: Array<OrderItemsDto>;
}
