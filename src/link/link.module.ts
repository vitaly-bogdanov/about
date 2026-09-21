import { Module } from '@nestjs/common';
import { LinkResolver } from './link.resolver';
import { LinkService } from './link.service';

@Module({
  providers: [LinkService, LinkResolver],
  exports: [LinkService],
})
export class LinkModule {}
