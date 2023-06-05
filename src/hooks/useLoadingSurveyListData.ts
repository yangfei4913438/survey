import { useRequest } from 'ahooks';

import useProjectRoute from '@/hooks/useProjectRoute';
import { getQuestionsServices } from '@/services/question';

interface ILoadingSurveyListData {
  isStar?: boolean;
  isDeleted?: boolean;
}

const useLoadingSurveyListData = <T>(options?: ILoadingSurveyListData) => {
  const { currentPage, currentPageSize, currentKeyword } = useProjectRoute();

  const { loading, data, error } = useRequest(
    async () => {
      // 定义查询对象
      const params: any = { page: currentPage, pageSize: currentPageSize };
      // 如果搜索关键字不存在，那么就不用加上了，这个和分页不一样。
      if (currentKeyword) {
        params.keyword = currentKeyword;
      }
      // 判断是否为布尔值
      if (options?.isStar && typeof options?.isStar === 'boolean') {
        params.isStar = options.isStar;
      }
      // 判断是否为布尔值
      if (options?.isDeleted && typeof options?.isDeleted === 'boolean') {
        params.isDeleted = options.isDeleted;
      }

      // 返回请求结果
      return await getQuestionsServices<T>(params);
    },
    {
      refreshDeps: [currentKeyword, currentPage, currentPageSize], // 重新发起请求的依赖项
    }
  );

  return {
    loading,
    data,
    error,
  };
};

export default useLoadingSurveyListData;
