import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-v4' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  name: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  picture: string | null;

  @ApiPropertyOptional({ example: 'sub_1234567890' })
  subscriptionId: string | null;

  @ApiProperty({ example: 0 })
  credit: number;

  @ApiPropertyOptional({ example: '175' })
  height: string | null;

  @ApiPropertyOptional({ example: '70' })
  weight: string | null;

  @ApiPropertyOptional({ example: 'male' })
  gender: string | null;

  @ApiPropertyOptional({ example: 'lose_weight' })
  goal: string | null;

  @ApiPropertyOptional({ example: 2000 })
  calories: number | null;

  @ApiPropertyOptional({ example: 150 })
  proteins: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
