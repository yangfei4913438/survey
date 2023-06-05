import { useRequest } from 'ahooks';

import { updateQuestionServices } from '@/services/question';

interface IUseUpdateSurvey {
  _id: string;
  updateData: Partial<Omit<SurveySimpleType, '_id'>>;
  onSuccess?: (data: unknown, params: []) => void;
  onError?: (e: Error, params: []) => void;
}

const useUpdateSurvey = ({ _id, updateData, onSuccess, onError }: IUseUpdateSurvey) => {
  // 调用更新接口
  const { run: changeSurvey, loading: changeSurveyLoading } = useRequest(
    async () => {
      // 发送更新请求
      return await updateQuestionServices(_id, updateData);
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
