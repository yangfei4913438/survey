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
          username: Random.title(),
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
          token: Random.word(20),
        },
      };
    },
  },
];
