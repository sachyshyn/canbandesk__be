import { ROLES } from '@/shared/constants';
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

  @Field(() => [String])
  roles: ROLES[];
}

@ObjectType()
export class UserWithPassword extends User {
  @Field()
  password: string;
}
