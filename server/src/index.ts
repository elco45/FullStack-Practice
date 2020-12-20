import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { MikroORM } from "@mikro-orm/core";
import { buildSchema } from "type-graphql";
import microConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const PORT = 4000;

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up(); // runs migration when server is up

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em })
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`);
  });
};

main();
