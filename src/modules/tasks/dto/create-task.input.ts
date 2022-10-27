import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @Field(() => String)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @Field(() => String)
  description: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  date: string;
}
