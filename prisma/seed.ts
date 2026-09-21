import { PrismaClient } from '@prisma/client';
import { DigitalCardSeedService } from '../src/database/postgres/digital-card/digital-card-seed.service';

const prisma = new PrismaClient();

async function main() {
  const seed = new DigitalCardSeedService(prisma as never);
  await seed.ensureSeeded();
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
