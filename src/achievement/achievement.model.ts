import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Achievement {
  @Field()
  id: string;

  @Field()
  text: string;
}
