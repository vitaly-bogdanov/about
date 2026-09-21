import {
  profileFixture,
  setupGraphqlTest,
  type GraphqlTestContext,
} from '../testing/graphql-app';

describe('profile', () => {
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

  it('returns requested scalars without loading nested collections', async () => {
    const { statusCode, body } = await ctx.execute(`{
      profile {
        name
        description
      }
    }`);

    expect(statusCode).toBe(200);
    expect(body.errors).toBeUndefined();
    expect(body.data).toEqual({
      profile: {
        name: profileFixture.name,
        description: profileFixture.description,
      },
    });
    expect(ctx.linkService.findByProfileId).not.toHaveBeenCalled();
    expect(ctx.skillService.findByProfileId).not.toHaveBeenCalled();
    expect(ctx.experienceService.findByProfileId).not.toHaveBeenCalled();
  });

  it('returns null when the profile is missing', async () => {
    ctx.profileService.findCurrent.mockResolvedValueOnce(null);

    const { body } = await ctx.execute(`{ profile { name } }`);

    expect(body.errors).toBeUndefined();
    expect(body.data).toEqual({ profile: null });
    expect(ctx.linkService.findByProfileId).not.toHaveBeenCalled();
  });

  it('rejects unknown fields', async () => {
    const { statusCode, body } = await ctx.execute(`{
      profile {
        notAField
      }
    }`);

    expect(statusCode).toBe(400);
    expect(body.data).toBeUndefined();
    expect(body.errors?.[0]?.message).toMatch(/Cannot query field "notAField"/);
    expect(ctx.profileService.findCurrent).not.toHaveBeenCalled();
  });
});
