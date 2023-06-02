import Mock from 'mockjs';

const { Random } = Mock;

export const test = [
  {
    url: '/api/test',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          name: Random.cname(),
        },
      };
    },
  },
];
