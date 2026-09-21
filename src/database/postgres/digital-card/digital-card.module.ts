import { Module } from '@nestjs/common';
import { DigitalCardService } from './digital-card.service';

@Module({
  providers: [DigitalCardService],
  exports: [DigitalCardService],
})
export class DigitalCardModule {}
