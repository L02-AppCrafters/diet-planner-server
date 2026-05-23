import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { DailyLogsService } from './daily-logs.service';
import { UpsertDailyLogDto } from './dto/upsert-daily-log.dto';

@ApiTags('daily-logs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('daily-logs')
export class DailyLogsController {
  constructor(private readonly dailyLogsService: DailyLogsService) {}

  @Get()
  @ApiOperation({ summary: 'Get daily log(s). Provide date OR startDate+endDate.' })
  @ApiQuery({ name: 'date', required: false, example: '2026-05-15' })
  @ApiQuery({ name: 'startDate', required: false, example: '2026-05-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2026-05-15' })
  @ApiResponse({ status: 200, description: 'Log(s) returned' })
  async find(
    @CurrentUser() user: User,
    @Query('date') date?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (date) {
      return this.dailyLogsService.findByDate(user.id, date);
    }
    if (startDate && endDate) {
      return this.dailyLogsService.findRange(user.id, startDate, endDate);
    }
    return null;
  }

  @Get('weight-history')
  @ApiOperation({
    summary: 'Get weight history from daily logs (entries with currentWeight)',
  })
  @ApiQuery({ name: 'from', required: false, example: '2026-04-01' })
  @ApiQuery({ name: 'to', required: false, example: '2026-05-15' })
  @ApiResponse({
    status: 200,
    description: 'Array of { logDate, currentWeight } ordered by date ASC',
  })
  async weightHistory(
    @CurrentUser() user: User,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.dailyLogsService.getWeightHistory(user.id, from, to);
  }

  @Put()
  @ApiOperation({ summary: 'Create or update daily log (upsert by date)' })
  @ApiResponse({ status: 200, description: 'Log upserted' })
  async upsert(@CurrentUser() user: User, @Body() dto: UpsertDailyLogDto) {
    return this.dailyLogsService.upsert(user.id, dto);
  }
}
