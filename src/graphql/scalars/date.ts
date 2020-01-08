import { GraphQLScalarType } from 'graphql';

import moment = require('moment');
const { Kind } = require('graphql/language');

const customScalarDate = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue: (value: number) => moment(value).valueOf(),
  serialize: (value: number) => moment(value).format('YYYY-MM-DD HH:mm:ss:SSS'),
  parseLiteral: (ast: any) =>
    ast.kind === Kind.INT ? parseInt(ast.value, 10) : null,
});

module.exports = { Date: customScalarDate };
