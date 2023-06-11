import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import { mockList } from './mock/index.mjs';

const app = new Koa();
const router = new Router();

// 模拟网络延迟，1s
async function getResult(fn, ctx) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, 200);
  });
}

mockList.forEach((item) => {
  const { url, method, response } = item;

  router[method](url, async (ctx) => {
    ctx.body = await getResult(response, ctx);
  });
});

app.use(cors());
app.use(bodyParser());
app.use((ctx, next) => {
  // 简单处理一下jwt, 不存在就干掉
  if (['/api/user/register', '/api/user/login'].includes(ctx.url)) {
    return next();
  } else {
    const jwt = ctx.header.authorization?.split(' ')[1];
    if (!ctx.header.authorization || !jwt) {
      ctx.body = {
        errno: 401,
        msg: '没有权限',
      };
      return ctx;
    }
    return next();
  }
});

app.use(router.routes());
app.listen(6001, () => {
  console.log('🚀 Server ready at http://localhost:6001');
});
