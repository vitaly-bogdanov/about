import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AchievementResolver } from '../achievement/achievement.resolver';
import { AchievementService } from '../achievement/achievement.service';
import {
  ExperienceListResolver,
  ExperienceResolver,
} from '../experience/experience.resolver';
import { ExperienceService } from '../experience/experience.service';
import { LinkResolver } from '../link/link.resolver';
import { LinkService } from '../link/link.service';
import { ProfileResolver } from '../profile/profile.resolver';
import { ProfileService } from '../profile/profile.service';
import { SkillResolver } from '../skill/skill.resolver';
import { SkillService } from '../skill/skill.service';

export type GraphqlBody = {
  data?: Record<string, unknown> | null;
  errors?: Array<{ message: string }>;
};

export const profileFixture = {
  id: 'profile-1',
  name: 'Виталий Трубчининов',
  description: 'TypeScript backend',
};

export const linksFixture = [
  { id: 'link-1', label: 'GitHub', url: 'https://github.com/example' },
];

export const skillsFixture = [
  { id: 'skill-1', name: 'TypeScript', category: 'Языки' },
];

export const experienceFixture = [
  {
    id: 'exp-1',
    company: 'Первая компания',
    position: 'Backend',
    location: 'Москва',
    website: null,
    startDate: new Date('2021-08-01T00:00:00.000Z'),
    endDate: new Date('2024-08-01T00:00:00.000Z'),
  },
  {
    id: 'exp-2',
    company: 'Вторая компания',
    position: 'Lead',
    location: null,
    website: null,
    startDate: new Date('2024-09-01T00:00:00.000Z'),
    endDate: null,
  },
];

export const achievementsFixture: Record<
  string,
  Array<{ id: string; text: string }>
> = {
  'exp-1': [{ id: 'ach-1', text: 'Спроектировал API биллинга' }],
  'exp-2': [{ id: 'ach-2', text: 'Вывел сервис в прод' }],
};

export type GraphqlTestContext = {
  app: NestFastifyApplication;
  profileService: { findCurrent: jest.Mock };
  linkService: { findByProfileId: jest.Mock };
  skillService: { findByProfileId: jest.Mock };
  experienceService: { findByProfileId: jest.Mock };
  achievementService: { loadByExperienceId: jest.Mock };
  execute: (query: string) => Promise<{
    statusCode: number;
    body: GraphqlBody;
  }>;
  reset: () => void;
};

export async function setupGraphqlTest(): Promise<GraphqlTestContext> {
  const profileService = { findCurrent: jest.fn() };
  const linkService = { findByProfileId: jest.fn() };
  const skillService = { findByProfileId: jest.fn() };
  const experienceService = { findByProfileId: jest.fn() };
  const achievementService = { loadByExperienceId: jest.fn() };

  const module = await Test.createTestingModule({
    imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: join(
          tmpdir(),
          `digital-card-graphql-test-${process.pid}-${Date.now()}.gql`,
        ),
        sortSchema: true,
        playground: false,
      }),
    ],
    providers: [
      ProfileResolver,
      LinkResolver,
      SkillResolver,
      ExperienceListResolver,
      ExperienceResolver,
      AchievementResolver,
      { provide: ProfileService, useValue: profileService },
      { provide: LinkService, useValue: linkService },
      { provide: SkillService, useValue: skillService },
      { provide: ExperienceService, useValue: experienceService },
      { provide: AchievementService, useValue: achievementService },
    ],
  }).compile();

  const app = module.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );
  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  const reset = () => {
    jest.clearAllMocks();
    profileService.findCurrent.mockResolvedValue(profileFixture);
    linkService.findByProfileId.mockResolvedValue(linksFixture);
    skillService.findByProfileId.mockResolvedValue(skillsFixture);
    experienceService.findByProfileId.mockResolvedValue(experienceFixture);
    achievementService.loadByExperienceId.mockImplementation(
      (experienceId: string) =>
        Promise.resolve(achievementsFixture[experienceId] ?? []),
    );
  };

  reset();

  return {
    app,
    profileService,
    linkService,
    skillService,
    experienceService,
    achievementService,
    reset,
    async execute(query: string) {
      const response = await app.inject({
        method: 'POST',
        url: '/graphql',
        payload: { query },
      });

      return {
        statusCode: response.statusCode,
        body: JSON.parse(response.body) as GraphqlBody,
      };
    },
  };
}
