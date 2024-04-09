import { request } from '@/core/ajax';

// 获取用户信息
export async function getUserInfoServices<T>() {
  return await request<T>({ name: 'userInfo' });
}

// 注册新用户
export async function userRegisterServices(data: UserType) {
  return await request<UserType>({ name: 'register', data });
}

// 用户登录
export async function userLoginServices<T>(data: Omit<UserType, 'nickname'>) {
  return await request<T>({ name: 'login', data });
}
