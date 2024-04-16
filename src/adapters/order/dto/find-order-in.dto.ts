import { ApiProperty } from '@nestjs/swagger';

export class FindOrderInDto {
  @ApiProperty({ type: Number, isArray: true })
  orderStatus: Array<number>;
}
