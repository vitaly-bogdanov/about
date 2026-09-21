import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile } from '../profile/profile.model';
import { Link } from './link.model';
import { LinkService } from './link.service';

@Resolver(() => Profile)
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}

  @ResolveField(() => [Link])
  links(@Parent() profile: Profile) {
    return this.linkService.findByProfileId(profile.id);
  }
}
