import { InputType, ObjectType, Field } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  userId: string;
}
