import Koa from 'koa';
import Router from 'koa-router';

import { mockList } from './mock/index.mjs';

const app = new Koa();
const router = new Router();

// 模拟网络延迟，500ms
async function getResult(fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn();
      resolve(res);
    }, 500);
  });
}

mockList.forEach((item) => {
  const { url, method, response } = item;

  router[method](url, async (ctx) => {
    ctx.body = await getResult(response);
  });
});

app.use(router.routes());
app.listen(6001); // port
