import { useRequest } from 'ahooks';

import useProjectRoute from '@/hooks/useProjectRoute';
import { getStatListServices } from '@/services/stat';

const useLoadingSurveyStatListData = <T>() => {
  const {
    pathParams: { id = '' },
  } = useProjectRoute();
  const { currentPage, currentPageSize } = useProjectRoute();

  const { loading, data, error, refresh } = useRequest(
    async () => {
      // 定义查询对象
      const params: Partial<RequestOptionType> = { page: currentPage, pageSize: currentPageSize };

      // 返回请求结果
      return await getStatListServices<T>(id, params);
    },
    {
      ready: !!id,
      refreshDeps: [currentPage, currentPageSize], // 重新发起请求的依赖项
    }
  );

  return {
    loading,
    data,
    error,
    refresh,
  };
};

export default useLoadingSurveyStatListData;
