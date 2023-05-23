import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
@ObjectType()
export class DeleteUserInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
