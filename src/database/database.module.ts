import { Global, Module } from '@nestjs/common';
import { DigitalCardModule } from './postgres/digital-card/digital-card.module';

@Global()
@Module({
  imports: [DigitalCardModule],
  exports: [DigitalCardModule],
})
export class DatabaseModule {}
