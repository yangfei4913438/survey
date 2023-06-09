import { useTitle } from 'ahooks';
import cls from 'classnames';
import React, { FC } from 'react';

import ListPagination from '@/components/ListPagination';
import ListTitle from '@/components/ListTitle';
import useLoadingSurveyListData from '@/hooks/network/useLoadingSurveyListData';
import SurveyList from '@/pages/manage/components/surveyList';

const ManageStar: FC = () => {
  useTitle('星星问卷 - 星标问卷');

  const { loading, data } = useLoadingSurveyListData<ResultSurveySimpleType>({ isStar: true });

  const list = data?.list || [];
  const total = data?.total || 0;

  return (
    <div className={cls('flex h-full flex-col space-y-4')}>
      <ListTitle name={'星标问卷'} />
      <SurveyList list={list} loading={loading}>
        <div className='bg-white py-8 text-center'>
          <ListPagination total={total} />
        </div>
      </SurveyList>
    </div>
  );
};

export default ManageStar;
