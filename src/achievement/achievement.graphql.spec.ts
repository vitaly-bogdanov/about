import {
  setupGraphqlTest,
  type GraphqlTestContext,
} from '../testing/graphql-app';

describe('achievement', () => {
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

  it('loads achievements per experience when the field is selected', async () => {
    const { body } = await ctx.execute(`{
      profile {
        experience {
          company
          achievements { text }
        }
      }
    }`);

    expect(body.errors).toBeUndefined();
    expect(body.data).toEqual({
      profile: {
        experience: [
          {
            company: 'Первая компания',
            achievements: [{ text: 'Спроектировал API биллинга' }],
          },
          {
            company: 'Вторая компания',
            achievements: [{ text: 'Вывел сервис в прод' }],
          },
        ],
      },
    });
    expect(ctx.achievementService.loadByExperienceId).toHaveBeenCalledTimes(2);
    expect(ctx.achievementService.loadByExperienceId).toHaveBeenNthCalledWith(
      1,
      'exp-1',
    );
    expect(ctx.achievementService.loadByExperienceId).toHaveBeenNthCalledWith(
      2,
      'exp-2',
    );
  });
});
