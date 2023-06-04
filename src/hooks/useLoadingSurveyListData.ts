import { useRequest } from 'ahooks';

import { actions } from '@/consts/actions';
import useProjectRoute from '@/hooks/useProjectRoute';
import { getQuestions } from '@/services/question';

interface ILoadingSurveyListData {
  isStar?: boolean;
  isDeleted?: boolean;
}

const useLoadingSurveyListData = <T>(options?: ILoadingSurveyListData) => {
  const { searchParams } = useProjectRoute();

  const { loading, data, error } = useRequest(
    async () => {
      // 获取页面的查询参数
      const keyword = searchParams.get(actions.survey.searchKey);

      // 定义查询对象
      const params: any = {};
      // 判断是否有值
      if (keyword) {
        params.keyword = keyword;
      }
      // 判断是否为布尔值
      if (options?.isStar && typeof options?.isStar == 'boolean') {
        params.isStar = options.isStar;
      }
      // 判断是否为布尔值
      if (options?.isDeleted && typeof options?.isDeleted == 'boolean') {
        params.isDeleted = options.isDeleted;
      }
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
