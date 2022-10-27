import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileResponse {
  @Field(() => String)
  sub: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}
