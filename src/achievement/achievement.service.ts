import { Injectable, Scope } from '@nestjs/common';
import { Achievement } from '@prisma/client';
import DataLoader from 'dataloader';
import { DigitalCardService } from '../database/postgres/digital-card/digital-card.service';

@Injectable({ scope: Scope.REQUEST })
export class AchievementService {
  constructor(private readonly prisma: DigitalCardService) {}

  loadByExperienceId(experienceId: string): Promise<Achievement[]> {
    return this.achievementsByExperienceId.load(experienceId);
  }

  private readonly achievementsByExperienceId = new DataLoader<
    string,
    Achievement[]
  >(async (experienceIds) => {
    const achievements = await this.prisma.achievement.findMany({
      where: { experienceId: { in: [...experienceIds] } },
      orderBy: { sortOrder: 'asc' },
    });
    const grouped = new Map<string, Achievement[]>(
      experienceIds.map((id) => [id, []]),
    );

    for (const achievement of achievements) {
      grouped.get(achievement.experienceId)?.push(achievement);
    }

    return experienceIds.map((id) => grouped.get(id) ?? []);
  });
}
