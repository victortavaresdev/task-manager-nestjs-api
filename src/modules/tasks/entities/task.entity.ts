import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from '@prisma/client';

@ObjectType()
export class TaskEntity implements Task {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: false })
  title: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => String, { nullable: false })
  date: string;

  @Field(() => Boolean)
  isCompleted: boolean;

  @Field(() => String, { nullable: false })
  user_id: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
