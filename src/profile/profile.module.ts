import { Module } from '@nestjs/common';
import { ExperienceModule } from '../experience/experience.module';
import { LinkModule } from '../link/link.module';
import { SkillModule } from '../skill/skill.module';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  imports: [LinkModule, SkillModule, ExperienceModule],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
