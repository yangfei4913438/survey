// 合法的路由列表
export const routeBasePath = {
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
  manageStar: '/manage/star',
  // 问卷回收站
  manageTrash: '/manage/trash',
  // 问卷详情
  survey: '/survey',
} as const; // 最后声明为 const, 对象的值才能转换成类型

export const routePath = {
  ...routeBasePath,
  // 问卷详情 - 编辑问卷
  surveyEdit: '/survey/edit/:id',
  // 问卷详情 - 问卷统计
  surveyStat: '/survey/stat/:id',
} as const;

// 对象的值转换成联合类型
type ValueOf<T> = T[keyof T];
// 合法的路由类型
export type RouteBaseType = ValueOf<typeof routeBasePath>;

// 带变量的路由
type IsSurvey<Path> = Path extends 'survey' ? Path : never;
type IsSubPath<Path> = Path extends 'edit' | 'stat' ? Path : never;
type IsNull<Path> = Path extends undefined | '' | null ? never : Path;
type IsMore<Path> = Path extends `${infer PartA}/${infer PartB}` ? never : IsNull<Path>;
type SurveyPath<Path> = Path extends `/${infer PartA}/${infer PartB}/${infer PartC}`
  ? `/${IsSurvey<PartA>}/${IsSubPath<PartB>}/${IsMore<PartC>}`
  : never;

// 路由类型定义
export type StringPath<P> = RouteBaseType | SurveyPath<P>;

// 跳转路由的可传递参数
export type RoutePath<P> =
  | StringPath<P>
  | {
      pathname?: StringPath<P>;
      search?: string;
      hash?: string;
    };
