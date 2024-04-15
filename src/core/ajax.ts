import message from 'antd/es/message';
import axios, { AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';

import { apiConfig, ConfigKeyType } from '@/consts/apis';
import { cacheKeys } from '@/consts/cache';
import localCache from '@/core/cache';

import { getNavigate } from './navigation';

/**
 * 创建 axios 实例
 * */
const instance = axios.create({
  timeout: 30 * 1000, // 30秒超时
});

/**
 * 配置异常重试
 * */
axiosRetry(instance, { retries: 3, retryDelay: (retryCount) => retryCount * 1000 });

// 返回数据都是对象
export type ResDataType = {
  [key: string]: any;
};

export type ResType<T = ResDataType> = {
  errno?: number;
  data?: T;
  msg?: string;
};

/**
 * 发起请求，统一拦截
 * */
instance.interceptors.request.use(
  (config) => {
    // Do something before the request is sent

    // 取出存储的token
    const token = localCache.getItem(cacheKeys.token);
    // 追加jwt的信息到头部
    config.headers['Authorization'] = token ? `Bearer ${token}` : '';

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

/**
 * 对返回体错误信息分类
 */
instance.interceptors.response.use(
  async (res) => {
    const resData = (res.data || {}) as ResType;
    const { data } = resData;
    // 返回数据
    return data as any;
  },
  ({ response }) => {
    // 上报异常错误信息，这里举例，所以只是打印错误
    console.error('axios exception:', response);
    const navigate = getNavigate();
    switch (response.status) {
      case 401:
        // 参数类错误
        return Promise.resolve(response);
      case 403:
        // 权限错误
        localCache.clear();
        return navigate('/login');
      default:
        // 请求的地方，自己决定是否处理异常
        return Promise.reject(response);
    }
  }
);

interface IRequestParam {
  name: ConfigKeyType;
  data?: any;
  id?: string;
  componentId?: string;
  axiosConfig?: AxiosRequestConfig;
}
export const request = <T>({
  name,
  data,
  id,
  componentId,
  axiosConfig,
}: IRequestParam): Promise<T> => {
  const { url, method, needId, needComponentID } = apiConfig[name];

  if (needComponentID && !componentId) {
    return Promise.reject('缺少组件ID');
  }

  // 判断一下路由
  const baseUrl = needId ? `${url}/${id}` : url;
  const reqUrl = needComponentID ? `${baseUrl}/${componentId}` : baseUrl;

  switch (method) {
    case 'get':
      return get<T>(reqUrl, axiosConfig);
    case 'post':
      return post<T>(reqUrl, data!, axiosConfig);
    case 'patch':
      return patch<T>(reqUrl, data!, axiosConfig);
    case 'delete':
      return del<T>(reqUrl, axiosConfig);
    default:
      return put<T>(reqUrl, data!, axiosConfig);
  }
};

export const get = <T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.get<any, T, any>(url, axiosConfig);
};

export const post = <T>(url: string, data: any, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.post<any, T, any>(url, data, axiosConfig);
};

export const put = <T>(url: string, data: any, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.put<any, T, any>(url, data, axiosConfig);
};

export const patch = <T>(url: string, data: any, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.patch<any, T, any>(url, data, axiosConfig);
};

export const del = <T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.delete<any, T, any>(url, axiosConfig);
};
