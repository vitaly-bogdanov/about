import { Module } from '@nestjs/common';
import { AchievementResolver } from './achievement.resolver';
import { AchievementService } from './achievement.service';

@Module({
  providers: [AchievementService, AchievementResolver],
  exports: [AchievementService],
})
export class AchievementModule {}
