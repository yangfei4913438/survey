import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import { mockList } from './mock/index.mjs';

const app = new Koa();
const router = new Router();

// 模拟网络延迟，1s
async function getResult(fn, ctx) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, 1000);
  });
}

mockList.forEach((item) => {
  const { url, method, response } = item;

  router[method](url, async (ctx) => {
    ctx.body = await getResult(response, ctx);
  });
});

app.use(bodyParser());
app.use(router.routes());
app.listen(6001); // port
