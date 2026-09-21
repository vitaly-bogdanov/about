import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile } from '../profile/profile.model';
import { Skill } from './skill.model';
import { SkillService } from './skill.service';

@Resolver(() => Profile)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @ResolveField(() => [Skill])
  skills(@Parent() profile: Profile) {
    return this.skillService.findByProfileId(profile.id);
  }
}
