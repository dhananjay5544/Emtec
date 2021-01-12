import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import resolvers from "./resolvers";

(async () => {
  const app = express();

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`API server started on http://localhost:${port}/graphql`);
  });
})();
