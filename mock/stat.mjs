import { getStatList } from './utils/list.mjs';

export const stat = [
  // 答卷列表
  {
    url: '/api/stat/:id',
    method: 'get',
    response(ctx) {
      console.log('req:', ctx.header.authorization);
      return {
        errno: 0,
        data: {
          total: 100,
          list: getStatList(),
        },
      };
    },
  },
];
