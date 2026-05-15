import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateShoppingListDto {
  @ApiPropertyOptional({ example: 'Weekly Groceries' })
  @IsString()
  @IsOptional()
  name?: string;
}
