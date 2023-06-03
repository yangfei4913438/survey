import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';

import { apiConfig, ConfigKeyType } from '@/consts/apis';

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
 * 对返回体错误信息分类
 */
instance.interceptors.response.use(
  async (res) => {
    const resData = (res.data || {}) as ResType;
    const { errno, msg, data } = resData;
    // 不使用http异常码，http状态码都返回200
    // 自定义错误码: 0 表示正常。
    if (typeof errno === 'number' && errno !== 0) {
      if (msg) {
        message.error(msg);
      }
      // 上报异常
      throw new Error(msg);
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
  params?: AxiosRequestConfig;
}
export const request = <T>({ name, id, params }: IRequestParam): Promise<T> => {
  const { url, method, needId } = apiConfig[name];
  // 判断一下路由
  const reqUrl = needId ? `${url}/${id}` : url;

  switch (method) {
    case 'get':
      return get<T>(reqUrl, params);
    case 'post':
      return post<T>(reqUrl, params);
    case 'patch':
      return patch<T>(reqUrl, params);
    case 'delete':
      return del<T>(reqUrl, params);
    default:
      return put<T>(reqUrl, params);
  }
};

export const get = <T>(url: string, params?: AxiosRequestConfig): Promise<T> => {
  return instance.get<any, T, any>(url, {
    params: params,
  });
};

export const post = <T>(url: string, params?: AxiosRequestConfig): Promise<T> => {
  return instance.post<any, T, any>(url, params);
};

export const put = <T>(url: string, params?: AxiosRequestConfig): Promise<T> => {
  return instance.put<any, T, any>(url, params);
};

export const patch = <T>(url: string, params?: AxiosRequestConfig): Promise<T> => {
  return instance.patch<any, T, any>(url, params);
};

export const del = <T>(url: string, params?: AxiosRequestConfig): Promise<T> => {
  return instance.delete<any, T, any>(url, params);
};
