import {
  profileFixture,
  setupGraphqlTest,
  type GraphqlTestContext,
} from '../testing/graphql-app';

describe('link', () => {
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

  it('loads links only when the field is selected', async () => {
    const { body } = await ctx.execute(`{
      profile {
        links { label url }
      }
    }`);

    expect(body.errors).toBeUndefined();
    expect(body.data).toEqual({
      profile: {
        links: [{ label: 'GitHub', url: 'https://github.com/example' }],
      },
    });
    expect(ctx.linkService.findByProfileId).toHaveBeenCalledWith(
      profileFixture.id,
    );
    expect(ctx.skillService.findByProfileId).not.toHaveBeenCalled();
    expect(ctx.experienceService.findByProfileId).not.toHaveBeenCalled();
  });
});
