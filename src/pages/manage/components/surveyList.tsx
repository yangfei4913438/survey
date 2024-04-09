import { Empty, Spin } from 'antd';
import cls from 'classnames';
import React, { forwardRef, PropsWithChildren } from 'react';

import ListCard from '@/components/ListCard';

interface ISurveyList extends PropsWithChildren {
  list: SurveySimpleType[];
  loading: boolean;
}

const SurveyList = forwardRef<HTMLDivElement, ISurveyList>(({ list, loading, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cls('w-full flex-1', {
        'h-full flex items-center justify-center': list.length === 0,
      })}
    >
      {/* 问卷列表 */}
      {list.length > 0 ? (
        <div className='space-y-4 pb-4'>
          {list.map((item, index) => {
            const { id } = item;
            return <ListCard key={id} {...item} index={index} />;
          })}
          {children}
        </div>
      ) : loading ? (
        <Spin size={'large'} />
      ) : (
        <Empty description={'暂无数据'} />
      )}
    </div>
  );
});

SurveyList.displayName = 'SurveyList';

export default SurveyList;
