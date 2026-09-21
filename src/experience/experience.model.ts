import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Achievement } from '../achievement/achievement.model';

@ObjectType()
export class Experience {
  @Field()
  id: string;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field(() => String, { nullable: true })
  location?: string | null;

  @Field(() => String, { nullable: true })
  website?: string | null;

  @Field(() => GraphQLISODateTime)
  startDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date | null;

  @Field(() => String, {
    description:
      'Человекочитаемый период, например «Август 2021 — август 2026»',
  })
  period: string;

  @Field(() => [Achievement])
  achievements: Achievement[];
}
