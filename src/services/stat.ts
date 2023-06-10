import { request } from '@/core/ajax';

// 获取问卷统计列表
export async function getStatListServices<T>(id: string, params: Partial<RequestOptionType> = {}) {
  return await request<T>({ name: 'getStatList', id, axiosConfig: { params } });
}

// 问卷的组件统计数据
export async function getComponentStatListServices<T>(id: string, componentId: string) {
  return await request<T>({
    name: 'getSurveyComponentStatList',
    id,
    componentId,
  });
}
