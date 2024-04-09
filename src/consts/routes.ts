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

// 路由配置需要完整的路由定义
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
type IsSurvey<Path> = Path extends 'survey' ? Path : never; // 判断类型的值为 survey 否则为 never，表示预期之外的值
type IsSubPath<Path> = Path extends 'edit' | 'stat' ? Path : never; // 判断类型的值为 'edit' | 'stat' 否则为 never，表示预期之外的值
type IsNull<Path> = Path extends undefined | '' | null ? never : Path; // 判断是否为空，符合条件就是 never，否则就是正常路径
type IsMore<Path> = Path extends `${infer PartA}/${infer PartB}` ? never : IsNull<Path>; // 判断能否拆分成 2 部分，能就是 never 不能就看看是不是空
// 复合判断
// 看是不是能拆成三份，如果能就分别判断，三个部分的值是否在预期内，反之就是不符合条件的值
type SurveyPath<Path> = Path extends `/${infer PartA}/${infer PartB}/${infer PartC}`
  ? `/${IsSurvey<PartA>}/${IsSubPath<PartB>}/${IsMore<PartC>}`
  : never;

// 问卷路由，传入ID获取到完整路由地址
export const surveyPath = {
  edit: (id: string) => <const>`/survey/edit/${id}`, // 路由匹配，必须使用const断言
  stat: (id: string) => <const>`/survey/stat/${id}`,
};

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
