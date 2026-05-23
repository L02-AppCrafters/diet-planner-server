import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, LessThanOrEqual, MoreThanOrEqual, Not, Repository } from 'typeorm';
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

  async getWeightHistory(
    uid: string,
    from?: string,
    to?: string,
  ): Promise<{ logDate: string; currentWeight: number }[]> {
    const where: Record<string, unknown> = { uid, currentWeight: Not(IsNull()) };
    if (from && to) where.logDate = Between(from, to);
    else if (from) where.logDate = MoreThanOrEqual(from);
    else if (to) where.logDate = LessThanOrEqual(to);

    const rows = await this.logRepository.find({
      where: where as never,
      select: ['logDate', 'currentWeight'],
      order: { logDate: 'ASC' },
    });
    return rows.map((r) => ({
      logDate: r.logDate,
      currentWeight: Number(r.currentWeight),
    }));
  }
}
