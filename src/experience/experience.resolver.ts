import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { formatPeriod } from '../common/period';
import { Profile } from '../profile/profile.model';
import { Experience } from './experience.model';
import { ExperienceService } from './experience.service';

@Resolver(() => Profile)
export class ExperienceListResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @ResolveField(() => [Experience])
  experience(@Parent() profile: Profile) {
    return this.experienceService.findByProfileId(profile.id);
  }
}

@Resolver(() => Experience)
export class ExperienceResolver {
  @ResolveField(() => String)
  period(@Parent() experience: Experience): string {
    return formatPeriod(experience.startDate, experience.endDate);
  }
}
