/* eslint-disable import/no-dynamic-require */
// eslint-disable-next-line import/no-extraneous-dependencies
import { resolve } from 'path';
import { ApolloServer, gql } from 'apollo-server-koa';

import fs = require('fs');

const allCustomScalars = require('./scalars/index.ts');

const defaultPath = resolve(__dirname, '../components/');
const typeDefFileName = 'schema.ts';
const resolverFileName = 'resolver.ts';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

function generateTypeDefsAndResolvers() {
  const typeDefs = [linkSchema];
  const resolvers = { ...allCustomScalars };

  const generateAllComponentRecursive = (path = defaultPath) => {
    const list = fs.readdirSync(path);

    list.forEach((item) => {
      const resolverPath = `${path}/${item}`;
      const stat = fs.statSync(resolverPath);
      const isDir = stat.isDirectory();
      const isFile = stat.isFile();

      if (isDir) {
        generateAllComponentRecursive(resolverPath);
      } else if (isFile && item === typeDefFileName) {
        const { schema } = require(resolverPath);

        typeDefs.push(schema);
      } else if (isFile && item === resolverFileName) {
        const resolversPerFile = require(resolverPath);

        Object.keys(resolversPerFile).forEach((k) => {
          if (!resolvers[k]) resolvers[k] = {};
          resolvers[k] = { ...resolvers[k], ...resolversPerFile[k] };
        });
      }
    });
  };

  generateAllComponentRecursive();

  return { typeDefs, resolvers };
}

const isProd = process.env.NODE_ENV === 'production';

const apolloServerOptions = {
  ...generateTypeDefsAndResolvers(),
  formatError: (error: any) => ({
    code: error.extensions.code,
    message: error.message,
  }),
  context: (request: any) => ({ ...request }),
  introspection: !isProd,
  playground: !isProd,
  mocks: !isProd,
};

const apolloServer = new ApolloServer({ ...apolloServerOptions });

export default apolloServer;