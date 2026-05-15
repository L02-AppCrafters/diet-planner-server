import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private readonly configService: ConfigService) {}

  @Cron('0 0,10,20,30,40,50 * * * *')
  async selfPing(): Promise<void> {
    const url = this.configService.get<string>('HEALTH_CHECK_URL') ?? `http://localhost:${this.configService.get<number>('PORT') ?? 3000}/health`;
    const start = Date.now();
    try {
      const res = await fetch(url);
      const elapsed = Date.now() - start;
      this.logger.log(`Health check OK — ${res.status} (${elapsed}ms)`);
    } catch (err) {
      this.logger.error(`Health check FAILED — ${(err as Error).message}`);
    }
  }
}
