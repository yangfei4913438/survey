// http方法类型
export type RestfulType = 'get' | 'post' | 'put' | 'patch' | 'delete';

// 配置key的类型
export type ConfigKeyType =
  | 'userInfo'
  | 'register'
  | 'login'
  | 'createQuestion'
  | 'getQuestion'
  | 'getQuestions'
  | 'patchQuestion'
  | 'delQuestions'
  | 'copyQuestion';

interface ConfigObject {
  // restful 方法
  method: RestfulType;
  // 路由
  url: string;
  // 是否需要拼接路径ID参数
  needId: boolean;
}

// 配置对象的类型
type ApiConfigType = { [T in ConfigKeyType]: ConfigObject };

// api 配置
export const apiConfig: ApiConfigType = {
  // 获取用户信息
  userInfo: {
    method: 'get',
    url: '/api/user/info',
    needId: false,
  },
  // 注册
  register: {
    method: 'post',
    url: '/api/user/register',
    needId: false,
  },
  // 登录
  login: {
    method: 'post',
    url: '/api/user/login',
    needId: false,
  },
  // 创建问卷
  createQuestion: {
    method: 'post',
    url: '/api/question',
    needId: false,
  },
  // 获取单个问卷
  getQuestion: {
    method: 'get',
    url: '/api/question',
    needId: true,
  },
  // 获取问卷列表
  getQuestions: {
    method: 'get',
    url: '/api/question',
    needId: false,
  },
  // 更新问卷信息
  patchQuestion: {
    method: 'patch',
    url: '/api/question',
    needId: true,
  },
  // 批量彻底删除问卷
  delQuestions: {
    method: 'delete',
    url: '/api/question',
    needId: false,
  },
  // 复制问卷
  copyQuestion: {
    method: 'post',
    url: '/api/question/duplicate',
    needId: true,
  },
};
