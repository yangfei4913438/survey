import { request } from '@/core/ajax';

// 获取单个问卷
export async function getQuestionServices<T>(id: string) {
  return await request<T>({ name: 'getQuestion', id });
}

// 获取问卷列表
export async function getQuestionsServices<T>(params: Partial<RequestOptionType> = {}) {
  return await request<T>({ name: 'getQuestions', axiosConfig: { params } });
}

// 创建问卷
export async function createQuestionServices<T>() {
  return await request<T>({ name: 'createQuestion' });
}

// 更新问卷
export async function updateQuestionServices<T>(
  id: string,
  data: Partial<Omit<SurveySimpleType, '_id'>> | SurveyDetailType
) {
  return await request<T>({ name: 'patchQuestion', id, axiosConfig: { data } });
}

// 复制问卷
export async function copyQuestionServices<T>(id: string) {
  return await request<T>({ name: 'copyQuestion', id });
}

// 删除问卷
export async function deleteSurveysService<T>(data: string[]) {
  return await request<T>({ name: 'delQuestions', axiosConfig: { data } });
}
