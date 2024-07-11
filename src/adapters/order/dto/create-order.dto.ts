import { ApiProperty } from '@nestjs/swagger';

class OrderItemsDto {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  name: string;
}

export class CreateOrderDto {
  @ApiProperty()
  client: string;

  @ApiProperty()
  amount: number;

  @ApiProperty({ type: [OrderItemsDto] })
  items: Array<OrderItemsDto>;
}
