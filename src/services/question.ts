import { request } from '@/core/ajax';

// 获取单个问卷
export async function getQuestion<T>(id: string) {
  return await request<T>({ name: 'getQuestion', id });
}

// 获取问卷列表

// 创建问卷
export async function createQuestion<T>() {
  return await request<T>({ name: 'createQuestion' });
}
