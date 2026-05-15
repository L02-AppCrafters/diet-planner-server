import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateShoppingListItemDto {
  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isPurchased?: boolean;
}
