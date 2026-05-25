import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RecognizeFoodDto } from './dto/recognize-food.dto';
import { AiService } from './ai.service';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recognize-food')
  @ApiOperation({ summary: 'Recognize food image and return suggested recipe data' })
  async recognizeFood(@Body() dto: RecognizeFoodDto) {
    return this.aiService.recognizeFoodFromImage(dto.imageBase64, dto.prompt);
  }
}

