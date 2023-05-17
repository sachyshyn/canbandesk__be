import { InputType, ObjectType, Field } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class DeleteUserInput {
  @Field()
  userId: string;
}
