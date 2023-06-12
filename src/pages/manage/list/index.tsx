import { useTitle } from 'ahooks';
import { Spin } from 'antd';
import cls from 'classnames';
import React, { FC, useRef } from 'react';

import ListTitle from '@/components/ListTitle';
import useLoadingSurveyMoreData from '@/hooks/network/useLoadingSurveyMoreData';
import SurveyList from '@/pages/manage/components/surveyList';

const ManageList: FC = () => {
  useTitle('星星问卷 - 我的问卷');

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { pageInfo, loading, haveMoreData } = useLoadingSurveyMoreData(loadMoreRef);

  return (
    <div className={cls('flex h-full flex-col space-y-4')}>
      <ListTitle name={'我的问卷'} />
      <SurveyList list={pageInfo.list} loading={loading}>
        <div className='bg-white py-8 text-center'>
          <div ref={loadMoreRef}>{haveMoreData ? <Spin size={'large'} /> : '------ END -----'}</div>
        </div>
      </SurveyList>
    </div>
  );
};

export default ManageList;
