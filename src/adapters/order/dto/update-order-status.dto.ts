import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @ApiProperty()
  status: string;
  @ApiProperty()
  id: string;
}
