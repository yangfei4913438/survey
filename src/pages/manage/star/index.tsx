import { Empty, Spin } from 'antd';
import cls from 'classnames';
import React, { FC } from 'react';

import ListCard from '@/components/ListCard';
import ListTitle from '@/components/ListTitle';
import useLoadingSurveyListData from '@/hooks/useLoadingSurveyListData';
import styles from '@/styles/base.module.scss';

const ManageStar: FC = () => {
  const { loading, data } = useLoadingSurveyListData<ResultSurveySimpleType>();

  const startList = data?.list.filter((item) => item.isStar) || [];

  return (
    <div className={'flex h-full flex-col space-y-2'}>
      <ListTitle name='星标问卷' />
      <div
        className={cls('w-full flex-1 ', {
          'h-full flex items-center justify-center': startList.length === 0,
        })}
      >
        {/* 问卷列表 */}
        {startList.length > 0 ? (
          <div className='space-y-4 pb-8'>
            {startList.map((q: any) => {
              const { _id } = q;
              return <ListCard key={_id} {...q} />;
            })}
          </div>
        ) : loading ? (
          <Spin size={'large'} />
        ) : (
          <Empty description={'暂无数据'} />
        )}
      </div>
      <div className={styles.footer}>{/*<div ref={containerRef}>{LoadMoreContentElem}</div>*/}</div>
    </div>
  );
};

export default ManageStar;
