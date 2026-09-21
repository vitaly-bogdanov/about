import {
  profileFixture,
  setupGraphqlTest,
  type GraphqlTestContext,
} from '../testing/graphql-app';

describe('skill', () => {
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

  it('loads skills only when the field is selected', async () => {
    const { body } = await ctx.execute(`{
      profile {
        skills { name category }
      }
    }`);

    expect(body.errors).toBeUndefined();
    expect(body.data).toEqual({
      profile: {
        skills: [{ name: 'TypeScript', category: 'Языки' }],
      },
    });
    expect(ctx.skillService.findByProfileId).toHaveBeenCalledWith(
      profileFixture.id,
    );
    expect(ctx.linkService.findByProfileId).not.toHaveBeenCalled();
    expect(ctx.experienceService.findByProfileId).not.toHaveBeenCalled();
  });
});
