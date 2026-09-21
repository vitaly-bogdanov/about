import { Field, ObjectType } from '@nestjs/graphql';
import { Experience } from '../experience/experience.model';
import { Link } from '../link/link.model';
import { Skill } from '../skill/skill.model';

@ObjectType()
export class Profile {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Link])
  links: Link[];

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Experience])
  experience: Experience[];
}
