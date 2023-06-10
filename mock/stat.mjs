import { getStatList } from './utils/list.mjs';
import Mock from 'mockjs';

export const stat = [
  // 答卷列表
  {
    url: '/api/stat/:id',
    method: 'get',
    response(ctx) {
      console.log('req:', ctx.header.authorization);
      const { isDeleted, isStar, keyword, page, pageSize } = ctx.query;
      return {
        errno: 0,
        data: {
          total: 100,
          list: getStatList(pageSize),
        },
      };
    },
  },
  // 获取单个组件的统计数据
  {
    url: '/api/stat/:surveyId/:componentId',
    method: 'get',
    response(ctx) {
      console.log('req:', ctx.header.authorization);
      // const { isDeleted, isStar, keyword, page, pageSize } = ctx.query;
      return {
        errno: 0,
        data: Mock.mock({
          ['stat|5']: [
            {
              name: '@cname',
              'value|1-100': 100,
            },
          ],
        }),
      };
    },
  },
];
