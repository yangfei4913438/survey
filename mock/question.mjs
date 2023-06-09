import Mock from 'mockjs';
import { getComponentList } from './utils/list.mjs';

const { Random, mock } = Mock;

function makeData({ lens = 10, isDeleted = false, isStar = false }) {
  const mockData = {
    [`data|${lens}`]: [
      {
        id: '@id',
        title: '@ctitle',
        'isPublished|1': '@boolean',
        answerCount: '@integer(50,1000)',
        createdAt: '@datetime("yyyy-MM-dd HH:mm:ss")',
        isStar,
        isDeleted,
      },
    ],
  };
  const result = mock(mockData);
  return result.data;
}

export const question = [
  {
    url: '/api/question/:id', // 单个问卷详情
    method: 'get',
    response(ctx) {
      console.log('query path params:', ctx.params.id);
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: '信息登记 - RDC',
          desc: '这是问卷描述',
          js: '',
          css: '',
          isPublished: true,
          componentList: getComponentList(),
        },
      };
    },
  },
  {
    url: '/api/question', // 问卷分页
    method: 'get',
    response(ctx) {
      const { isDeleted, isStar, keyword, page, pageSize } = ctx.query;
      console.log('query search params:', ctx.query);
      console.log(
        'query search params type: isDeleted %s, isStar %s, keyword %s',
        typeof isDeleted,
        typeof isStar,
        typeof keyword,
        typeof page,
        typeof pageSize
      );
      return {
        errno: 0,
        data: {
          list: makeData({
            lens: pageSize,
            isDeleted: isDeleted === 'true',
            isStar: isStar === 'true',
          }), // 当前页的列表数据
          total: 100, // 总数，分页
        },
      };
    },
  },
  {
    url: '/api/question', // 创建问卷
    method: 'post',
    response(ctx) {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      };
    },
  },
  {
    url: '/api/question', // 创建问卷
    method: 'delete',
    response(ctx) {
      console.log('query body:', ctx.request.body);
      return {
        errno: 0,
      };
    },
  },
  {
    url: '/api/question/duplicate/:id', // 复制问卷
    method: 'post',
    response(ctx) {
      console.log('query path params:', ctx.params.id);
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      };
    },
  },
  {
    url: '/api/question/:id', // 更新问卷
    method: 'patch',
    response(ctx) {
      console.log('query body:', ctx.request.body);
      return {
        errno: 0,
      };
    },
  },
];
