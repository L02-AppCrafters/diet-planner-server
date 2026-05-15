import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { DailyLog } from './entities/daily-log.entity';
import { UpsertDailyLogDto } from './dto/upsert-daily-log.dto';

@Injectable()
export class DailyLogsService {
  constructor(
    @InjectRepository(DailyLog)
    private readonly logRepository: Repository<DailyLog>,
  ) {}

  async upsert(uid: string, dto: UpsertDailyLogDto): Promise<DailyLog> {
    await this.logRepository.upsert(
      { uid, ...dto },
      { conflictPaths: ['uid', 'logDate'], skipUpdateIfNoValuesChanged: true },
    );
    return this.logRepository.findOne({ where: { uid, logDate: dto.logDate } }) as Promise<DailyLog>;
  }

  async findByDate(uid: string, date: string): Promise<DailyLog | null> {
    return this.logRepository.findOne({ where: { uid, logDate: date } });
  }

  async findRange(uid: string, startDate: string, endDate: string): Promise<DailyLog[]> {
    return this.logRepository.find({
      where: { uid, logDate: Between(startDate, endDate) },
      order: { logDate: 'ASC' },
    });
  }
}
