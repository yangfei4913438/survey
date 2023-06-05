// 本地存储的用户数据，不含密码
interface LocalUserType {
  username: string;
  nickname: string;
}

// 用户类型，注册使用
interface UserType extends LocalUserType {
  password: string;
}

// 登录后，从后端返回的数据结构
interface UserLoginResult {
  token: string;
  user: LocalUserType;
}
