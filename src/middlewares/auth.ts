// eslint-disable-next-line no-unused-vars
import { Context } from 'koa';

const auth = async (ctx: Context, next: () => Promise<any>) => {
  ctx.user = { name: 'your name', age: Math.random() };

  await next();
};

export default auth;
