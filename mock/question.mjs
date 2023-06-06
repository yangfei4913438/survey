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
            // header
            {
              fe_id: Random.id(),
              type: component_types.header, // 组件类型不能重复，前后端一致
              title: '',
              visible: true,
              locked: false,
              props: {
                title: '个人信息登记表',
                titleLevel: 1,
                titleAlignment: 'center',
                desc: '市场部员工专用',
                descAlignment: 'right',
              },
            },
            // title
            {
              fe_id: Random.id(),
              type: component_types.title, // 组件类型不能重复，前后端一致
              title: '基本信息',
              visible: true,
              locked: false,
              props: {
                text: '基本信息',
                level: 3,
                alignment: 'left',
              },
            },
            // input
            {
              fe_id: Random.id(),
              type: component_types.input,
              title: '姓名',
              visible: true,
              locked: false,
              props: {
                title: '姓名',
                placeholder: '请输入你的姓名...',
              },
            },
            // input
            {
              fe_id: Random.id(),
              type: component_types.input,
              title: '年龄',
              visible: true,
              locked: false,
              props: {
                title: '年龄',
                placeholder: '请输入你的年龄...',
              },
            },
            // title
            {
              fe_id: Random.id(),
              type: component_types.title, // 组件类型不能重复，前后端一致
              title: '工作信息',
              visible: true,
              locked: false,
              props: {
                text: '工作信息',
                level: 3,
                alignment: 'left',
              },
            },
            // input
            {
              fe_id: Random.id(),
              type: component_types.input,
              title: '职位',
              visible: true,
              locked: false,
              props: {
                title: '职位',
                placeholder: '请输入你的工作岗位...',
              },
            },
            {
              fe_id: Random.id(),
              type: component_types.input,
              title: '入职时间',
              visible: true,
              locked: false,
              props: {
                title: '入职时间',
                placeholder: '请输入你的入职时间...',
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
