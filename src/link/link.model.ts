import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field()
  id: string;

  @Field()
  label: string;

  @Field()
  url: string;
}
