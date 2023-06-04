import Mock from 'mockjs';

const { Random, mock } = Mock;

function makeData({ lens = 10, isDeleted = false, isStar = false }) {
  const mockData = {
    [`data|${lens}`]: [
      {
        _id: '@id',
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
    url: '/api/question/:id', // 单个问卷
    method: 'get',
    response(ctx) {
      console.log('query path params:', ctx.request.params.id);
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
        },
      };
    },
  },
  {
    url: '/api/question', // 问卷分页
    method: 'get',
    response(ctx) {
      const { isDeleted, isStar, keyword } = ctx.request.query;
      console.log('query search params:', ctx.request.query);
      console.log(
        'query search params type: isDeleted %s, isStar %s, keyword %s',
        typeof isDeleted,
        typeof isStar,
        typeof keyword
      );
      return {
        errno: 0,
        data: {
          list: makeData({
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
];
