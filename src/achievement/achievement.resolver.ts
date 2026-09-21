import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Experience } from '../experience/experience.model';
import { Achievement } from './achievement.model';
import { AchievementService } from './achievement.service';

@Resolver(() => Experience)
export class AchievementResolver {
  constructor(private readonly achievementService: AchievementService) {}

  @ResolveField(() => [Achievement])
  achievements(@Parent() experience: Experience) {
    return this.achievementService.loadByExperienceId(experience.id);
  }
}
