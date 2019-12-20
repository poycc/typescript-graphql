import 'reflect-metadata';
import apolloServer from './graphql';

const Koa = require('koa');

const app = new Koa();

apolloServer.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`,
  ),
);
