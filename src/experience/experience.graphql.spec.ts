import {
  profileFixture,
  setupGraphqlTest,
  type GraphqlTestContext,
} from '../testing/graphql-app';

describe('experience', () => {
  let ctx: GraphqlTestContext;

  beforeAll(async () => {
    ctx = await setupGraphqlTest();
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  beforeEach(() => {
    ctx.reset();
  });

  it('loads experience without achievements when they are omitted', async () => {
    const { body } = await ctx.execute(`{
      profile {
        experience {
          company
          position
        }
      }
    }`);

    expect(body.errors).toBeUndefined();
    expect(body.data).toEqual({
      profile: {
        experience: [
          { company: 'Первая компания', position: 'Backend' },
          { company: 'Вторая компания', position: 'Lead' },
        ],
      },
    });
    expect(ctx.experienceService.findByProfileId).toHaveBeenCalledWith(
      profileFixture.id,
    );
    expect(ctx.achievementService.loadByExperienceId).not.toHaveBeenCalled();
  });

  it('resolves period from start and end dates', async () => {
    const { body } = await ctx.execute(`{
      profile {
        experience {
          company
          period
        }
      }
    }`);

    expect(body.errors).toBeUndefined();
    expect(body.data).toEqual({
      profile: {
        experience: [
          {
            company: 'Первая компания',
            period: 'Август 2021 — август 2024',
          },
          {
            company: 'Вторая компания',
            period: 'Сентябрь 2024 — настоящее время',
          },
        ],
      },
    });
    expect(ctx.achievementService.loadByExperienceId).not.toHaveBeenCalled();
  });
});
