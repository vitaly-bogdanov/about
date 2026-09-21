import { Injectable, Logger } from '@nestjs/common';
import { DigitalCardService } from './digital-card.service';
import { digitalCardSeed } from './digital-card.seed-data';

@Injectable()
export class DigitalCardSeedService {
  private readonly logger = new Logger(DigitalCardSeedService.name);

  constructor(private readonly prisma: DigitalCardService) {}

  async ensureSeeded(): Promise<void> {
    const existing = await this.prisma.profile.count();
    if (existing > 0) {
      this.logger.log('Profile already present, skipping seed');
      return;
    }

    await this.prisma.profile.create({
      data: {
        name: digitalCardSeed.name,
        description: digitalCardSeed.description,
        links: {
          create: digitalCardSeed.links.map((link, sortOrder) => ({
            ...link,
            sortOrder,
          })),
        },
        skills: {
          create: digitalCardSeed.skills.map((skill, sortOrder) => ({
            ...skill,
            sortOrder,
          })),
        },
        experience: {
          create: digitalCardSeed.experience.map((item, sortOrder) => ({
            company: item.company,
            position: item.position,
            location: item.location,
            website: item.website,
            startDate: new Date(item.startDate),
            endDate: item.endDate ? new Date(item.endDate) : null,
            sortOrder,
            achievements: {
              create: item.achievements.map((text, achievementOrder) => ({
                text,
                sortOrder: achievementOrder,
              })),
            },
          })),
        },
      },
    });

    this.logger.log('Database seeded with profile data');
  }
}
