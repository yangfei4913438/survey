import { useRequest } from 'ahooks';

import { actions } from '@/consts/actions';
import useProjectRoute from '@/hooks/useProjectRoute';
import { getQuestions } from '@/services/question';

const useLoadingSurveyListData = <T>() => {
  const { searchParams } = useProjectRoute();

  const { loading, data, error } = useRequest(
    async () => {
      // 获取页面的查询参数
      const keyword = searchParams.get(actions.survey.searchKey) || '';
      // 判断一下是否为空
      const params = keyword ? { keyword } : {};
      // 返回请求结果
      return await getQuestions<T>(params);
    },
    {
      refreshDeps: [searchParams], // 重新发起请求的依赖项
    }
  );

  return {
    loading,
    data,
    error,
  };
};

export default useLoadingSurveyListData;
