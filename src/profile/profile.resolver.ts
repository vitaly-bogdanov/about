import { Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, {
    nullable: true,
    description: 'Цифровая визитка: профиль и связанные данные',
  })
  profile() {
    return this.profileService.findCurrent();
  }
}
