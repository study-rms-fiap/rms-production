import { ApiProperty } from '@nestjs/swagger';

class OrderItemsDto {
  @ApiProperty()
  product: string;
  @ApiProperty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  orderRef: string;
  @ApiProperty()
  client: string;
  @ApiProperty({ type: [OrderItemsDto] })
  items: Array<OrderItemsDto>;
}
