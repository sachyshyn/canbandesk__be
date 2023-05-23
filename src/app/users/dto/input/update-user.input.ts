import { ROLES } from '@/shared/constants';
import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

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

  @Field(() => [String], { nullable: true })
  @IsEnum(ROLES, { each: true })
  @ArrayMinSize(1)
  roles?: ROLES[];
}
