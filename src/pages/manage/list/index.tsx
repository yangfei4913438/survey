import { useTitle } from 'ahooks';
import { Empty, Spin } from 'antd';
import cls from 'classnames';
import React, { FC } from 'react';

import ListCard from '@/components/ListCard';
import ListTitle from '@/components/ListTitle';
import useLoadingSurveyListData from '@/hooks/useLoadingSurveyListData';

const ManageList: FC = () => {
  useTitle('星星问卷 - 我的问卷');

  const { loading, data } = useLoadingSurveyListData<ResultSurveySimpleType>();

  const list = data?.list || [];

  return (
    <div className={cls('flex h-full flex-col space-y-4')}>
      <ListTitle name='我的问卷' />
      <div
        className={cls('w-full flex-1', {
          'h-full flex items-center justify-center': list.length === 0,
        })}
      >
        {/* 问卷列表 */}
        {list.length > 0 ? (
          <div className='space-y-4 pb-8'>
            {list.map((item) => {
              const { _id } = item;
              return <ListCard key={_id} {...item} />;
            })}
          </div>
        ) : loading ? (
          <Spin size={'large'} />
        ) : (
          <Empty description={'暂无数据'} />
        )}
      </div>
      {/*<div className={styles.footer}>/!*<div ref={containerRef}>{LoadMoreContentElem}</div>*!/</div>*/}
    </div>
  );
};

export default ManageList;
