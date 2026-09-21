import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { DigitalCardService } from '../database/postgres/digital-card/digital-card.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: DigitalCardService) {}

  findCurrent(): Promise<Profile | null> {
    return this.prisma.profile.findFirst({
      orderBy: { createdAt: 'asc' },
    });
  }
}
