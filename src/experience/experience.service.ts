import { Injectable } from '@nestjs/common';
import { Experience } from '@prisma/client';
import { DigitalCardService } from '../database/postgres/digital-card/digital-card.service';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: DigitalCardService) {}

  findByProfileId(profileId: string): Promise<Experience[]> {
    return this.prisma.experience.findMany({
      where: { profileId },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
