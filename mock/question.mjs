import Mock from 'mockjs';

const { Random, mock } = Mock;

function makeData(lens, isDeleted = false) {
  const mockData = {
    [`data|${lens}`]: [
      {
        _id: '@id',
        title: '@ctitle',
        'isPublished|1': '@boolean',
        'isStar|1': '@boolean',
        answerCount: '@integer(50,1000)',
        createdAt: '@datetime("yyyy-MM-dd HH:mm:ss")',
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
    response() {
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
    response() {
      return {
        errno: 0,
        data: {
          list: makeData(10), // 当前页的列表数据
          total: 100, // 总数，分页
        },
      };
    },
  },
  {
    url: '/api/question', // 创建问卷
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      };
    },
  },
];
