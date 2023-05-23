import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
@ObjectType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field()
  @IsNotEmpty()
  id: string;
}
