import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  id: string;
}

@ObjectType()
export class UserWithPassword extends User {
  @Field()
  password: string;
}
