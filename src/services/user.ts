import { request } from '@/core/ajax';

// 获取用户信息
export async function getUserInfoServices<T>() {
  return await request<T>({ name: 'userInfo' });
}

// 注册新用户
export async function userRegisterServices<T>(data: UserType) {
  return await request<T>({ name: 'register', axiosConfig: { data } });
}

// 用户登录
export async function userLoginServices<T>(data: Omit<UserType, 'nickname'>) {
  return await request<T>({ name: 'login', axiosConfig: { data } });
}
