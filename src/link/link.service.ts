import { Injectable } from '@nestjs/common';
import { Link } from '@prisma/client';
import { DigitalCardService } from '../database/postgres/digital-card/digital-card.service';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: DigitalCardService) {}

  findByProfileId(profileId: string): Promise<Link[]> {
    return this.prisma.link.findMany({
      where: { profileId },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
