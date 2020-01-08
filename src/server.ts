import { createConnection } from 'typeorm';
import apolloServer from './graphql';
import 'reflect-metadata';
import auth from './middlewares/auth';

import bodyParser = require('koa-bodyparser');

import Koa = require('koa');

const app = new Koa();

app.use(bodyParser());
app.use((ctx: Koa.Context, next: () => Promise<any>) => auth(ctx, next));

apolloServer.applyMiddleware({ app });
// alternatively you can get a composed middleware from the apollo server
// app.use(server.getMiddleware());

createConnection()
  .then(async () => {
    console.log('database connect success!');
    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`,
      ),
    );
  })
  .catch((error) => console.error('database connect failed: ', error));
