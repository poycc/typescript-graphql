/* eslint-disable import/no-unresolved */
import apolloServer from './graphql';
import auth from './middlewares/auth';

import bodyParser = require('koa-bodyparser');

import Koa = require('koa');
const app = new Koa();
app.use(bodyParser());
app.use((ctx: Koa.Context, next: () => Promise<any>) => auth(ctx, next));

apolloServer.applyMiddleware({ app });
// alternatively you can get a composed middleware from the apollo server
// app.use(server.getMiddleware());

app.listen({ port: 4000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`,
  ),
);
