import { Injectable } from '@nestjs/common';
import { Skill } from '@prisma/client';
import { DigitalCardService } from '../database/postgres/digital-card/digital-card.service';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: DigitalCardService) {}

  findByProfileId(profileId: string): Promise<Skill[]> {
    return this.prisma.skill.findMany({
      where: { profileId },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
