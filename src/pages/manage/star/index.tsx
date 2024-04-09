import { useTitle } from 'ahooks';
import useRequest from 'ahooks/es/useRequest';
import cls from 'classnames';
import React, { FC, useMemo } from 'react';

import ListPagination from '@/components/ListPagination';
import ListTitle from '@/components/ListTitle';
import useProjectRoute from '@/hooks/useProjectRoute';
import SurveyList from '@/pages/manage/components/surveyList';
import { getQuestionsServices } from '@/services/question';

const ManageStar: FC = () => {
  useTitle('星星问卷 - 星标问卷');

  const { currentPage, currentPageSize, currentKeyword } = useProjectRoute();

  const { loading, data } = useRequest(
    async () => {
      // 定义查询对象
      const params: Partial<RequestOptionType> = {
        isStar: true,
        page: currentPage,
        pageSize: currentPageSize,
      };
      // 如果搜索关键字不存在，那么就不用加上了
      if (currentKeyword) {
        params.keyword = currentKeyword;
      }
      // 返回请求结果
      return await getQuestionsServices<ResultSurveySimpleType>(params);
    },
    {
      refreshDeps: [currentKeyword, currentPage, currentPageSize], // 重新发起请求的依赖项
    }
  );

  const renderList = useMemo(() => {
    if (data?.list && data.list.length > 0 && data.total > 0) {
      return (
        <SurveyList list={data.list} loading={loading}>
          <div className='bg-white py-8 text-center'>
            <ListPagination
              total={data.total}
              defaultPage={currentPage}
              defaultPageSize={currentPageSize}
            />
          </div>
        </SurveyList>
      );
    }
    return null;
  }, [data, loading, currentPage, currentPageSize]);

  return (
    <div className={cls('flex h-full flex-col space-y-4')}>
      <ListTitle name={'星标问卷'} />
      {renderList}
    </div>
  );
};

export default ManageStar;
