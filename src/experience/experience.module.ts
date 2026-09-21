import { Module } from '@nestjs/common';
import { AchievementModule } from '../achievement/achievement.module';
import {
  ExperienceListResolver,
  ExperienceResolver,
} from './experience.resolver';
import { ExperienceService } from './experience.service';

@Module({
  imports: [AchievementModule],
  providers: [ExperienceService, ExperienceListResolver, ExperienceResolver],
  exports: [ExperienceService],
})
export class ExperienceModule {}
