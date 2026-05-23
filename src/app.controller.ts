import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  healthCheck(): { status: string; timestamp: string } {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('health')
  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}
