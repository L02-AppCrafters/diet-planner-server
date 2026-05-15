import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyLog } from './entities/daily-log.entity';
import { DailyLogsService } from './daily-logs.service';
import { DailyLogsController } from './daily-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DailyLog])],
  controllers: [DailyLogsController],
  providers: [DailyLogsService],
})
export class DailyLogsModule {}
