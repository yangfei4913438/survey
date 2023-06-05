import { useRequest } from 'ahooks';

import useProjectRoute from '@/hooks/useProjectRoute';
import { getQuestionServices } from '@/services/question';

const useLoadingSurveyData = <T>() => {
  const {
    pathParams: { id = '' },
  } = useProjectRoute();

  const { loading, data, error } = useRequest(
    async () => {
      return await getQuestionServices<T>(id);
    },
    {
      ready: !!id,
    }
  );

  return {
    loading,
    data,
    error,
  };
};

export default useLoadingSurveyData;
