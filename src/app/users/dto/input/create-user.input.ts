import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { ArrayMinSize, IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ROLES } from '@/shared/constants';

@InputType()
@ObjectType()
export class CreateUserInput {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @Field(() => [String])
  @IsEnum(ROLES, { each: true })
  @ArrayMinSize(1)
  roles: ROLES[];
}
