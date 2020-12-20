import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/User";
import { MyContext } from "../types";

@InputType() // instead of using multiple args, we can create an object to pass in
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);
    return "bye";
  }
}
