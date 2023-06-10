import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';

import { apiConfig, ConfigKeyType } from '@/consts/apis';
import { cacheKeys } from '@/consts/cache';
import localCache from '@/core/cache';

/**
 * 创建 axios 实例
 * */
const instance = axios.create({
  // 开发环境使用 mock 数据，所以不需要 baseURL
  baseURL: import.meta.env.PROD ? 'http://192.168.50.98:7001/' : '',
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
    const { errno, msg, data } = resData;
    // 不使用http异常码，http状态码都返回200
    // 自定义错误码: 0 表示正常。
    if (typeof errno === 'number' && errno !== 0) {
      message.error(msg ?? '操作异常，请稍后再试', 1).then(() => {
        window.location.href = '/login';
        // 上报异常
        throw new Error(msg ?? `错误码: ${errno}`);
      });
    }
    // 返回数据
    return data as any;
  },
  (error) => {
    // 上报异常错误信息，这里举例，所以只是打印错误
    console.error('axios exception:', error);
    // 请求的地方，自己决定是否处理异常
    return Promise.reject(error);
  }
);

interface IRequestParam {
  name: ConfigKeyType;
  id?: string;
  componentId?: string;
  axiosConfig?: AxiosRequestConfig;
}
export const request = <T>({ name, id, componentId, axiosConfig }: IRequestParam): Promise<T> => {
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
      return post<T>(reqUrl, axiosConfig);
    case 'patch':
      return patch<T>(reqUrl, axiosConfig);
    case 'delete':
      return del<T>(reqUrl, axiosConfig);
    default:
      return put<T>(reqUrl, axiosConfig);
  }
};

export const get = <T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.get<any, T, any>(url, axiosConfig);
};

export const post = <T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.post<any, T, any>(url, axiosConfig);
};

export const put = <T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.put<any, T, any>(url, axiosConfig);
};

export const patch = <T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.patch<any, T, any>(url, axiosConfig);
};

export const del = <T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.delete<any, T, any>(url, axiosConfig);
};
