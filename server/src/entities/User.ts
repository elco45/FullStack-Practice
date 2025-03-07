import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType() 
@Entity() 
export class User {
  @Field()
  @PrimaryKey() 
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text", unique: true })
  username!: string;
  
  // remove field to prevent people from selecting the password, will be hashed
  @Property({ type: "text" })
  password!: string;
}
