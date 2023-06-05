import Mock from 'mockjs';
import { component_types } from './consts/editorComponent.mjs';

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
    url: '/api/question/:id', // 单个问卷详情
    method: 'get',
    response(ctx) {
      console.log('query path params:', ctx.params.id);
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
          componentList: [
            // title
            {
              fe_id: Random.id(),
              type: component_types.title, // 组件类型不能重复，前后端一致
              title: '市场部-张涛-华北区域',
              props: {
                text: '个人信息调研',
                level: 1,
                alignment: 'left',
              },
            },
            // input
            {
              fe_id: Random.id(),
              type: component_types.input,
              title: '输入框1',
              props: {
                title: '你的姓名',
                placeholder: '请输入你的姓名...',
              },
            },
            // input
            {
              fe_id: Random.id(),
              type: component_types.input,
              title: '输入框2',
              props: {
                title: '你的电话',
                placeholder: '请输入你的电话...',
              },
            },
          ],
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
