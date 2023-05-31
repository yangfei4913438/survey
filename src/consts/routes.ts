// 合法的路由列表
export const routePath = {
  // 首页
  home: '/',
  // 登录页
  login: '/login',
  // 注册页面
  register: '/register',
  // 问卷管理
  manage: '/manage',
  // 问卷列表, 嵌套路由可以写绝对路径，不会出问题
  manageList: '/manage/list',
  // 星标问卷
  manageStart: '/manage/start',
  // 问卷回收站
  manageTrash: '/manage/trash',
  // 问卷详情
  survey: '/survey',
  // 问卷详情 - 编辑问卷
  surveyEdit: '/survey/edit/:id',
  // 问卷详情 - 问卷统计
  surveyStat: '/survey/stat/:id',
} as const; // 最后声明为 const, 对象的值才能转换成类型

// 对象的值转换成联合类型
type ValueOf<T> = T[keyof T];

// 合法的路由类型
export type RouteType = ValueOf<typeof routePath>;

// 跳转路由的可传递参数
export type RoutePath =
  | RouteType
  | {
      pathname?: RouteType;
      search?: string;
      hash?: string;
    };
