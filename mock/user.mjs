import Mock from 'mockjs';

const { Random } = Mock;

export const user = [
  {
    url: '/api/user/info',
    method: 'get',
    response(ctx) {
      console.log('req:', ctx.header.authorization);
      return {
        errno: 0,
        data: {
          username: Random.name(),
          nickname: Random.cname(),
        },
      };
    },
  },
  {
    url: '/api/user/register',
    method: 'post',
    response(ctx) {
      console.log('query body:', ctx.request.body);
      return {
        errno: 0,
      };
    },
  },
  {
    url: '/api/user/login', // 创建问卷
    method: 'post',
    response(ctx) {
      console.log('query body:', ctx.request.body);
      return {
        errno: 0,
        data: {
          // jwt令牌
          token: Random.word(20),
          // 登录之后就把登录用户的数据返回，避免单独再发起一次用户数据的请求。
          user: {
            username: Random.name(),
            nickname: Random.cname(),
          },
        },
      };
    },
  },
];
