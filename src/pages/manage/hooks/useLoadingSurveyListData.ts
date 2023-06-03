import { useRequest } from 'ahooks';

import { getQuestions } from '@/services/question';

const useLoadingSurveyListData = <T>() => {
  const { loading, data, error } = useRequest(async () => {
    return await getQuestions<T>();
  });

  return {
    loading,
    data,
    error,
  };
};

export default useLoadingSurveyListData;
