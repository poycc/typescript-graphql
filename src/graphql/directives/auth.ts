import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-koa';

import { defaultFieldResolver } from 'graphql';

class AuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (...args: any) => {
      const context = args[2];
      const { user } = context.ctx;

      if (!user) throw new AuthenticationError('Authentication Failure');

      return resolve.apply(this, args);
    };
  }
}

module.exports = {
  auth: AuthDirective,
};
