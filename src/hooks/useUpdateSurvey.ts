import { useRequest } from 'ahooks';

import { updateQuestionServices } from '@/services/question';

interface IUseUpdateSurvey<T> {
  id: string;
  updateData: Partial<Omit<SurveySimpleType, '_id'>> | SurveyDetailType;
  onSuccess?: (data: T, params: []) => void;
  onError?: (e: Error, params: []) => void;
}

const useUpdateSurvey = <T>({ id, updateData, onSuccess, onError }: IUseUpdateSurvey<T>) => {
  // 调用更新接口
  const { run: changeSurvey, loading: changeSurveyLoading } = useRequest(
    async () => {
      // 发送更新请求
      return await updateQuestionServices<T>(id, updateData);
    },
    {
      manual: true,
      onSuccess: onSuccess,
      onError: onError,
    }
  );

  return {
    changeSurvey,
    changeSurveyLoading,
  };
};

export default useUpdateSurvey;
