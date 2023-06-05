import { Empty, Spin } from 'antd';
import cls from 'classnames';
import React, { FC, PropsWithChildren } from 'react';

import ListCard from '@/components/ListCard';

interface ISurveyList extends PropsWithChildren {
  list: SurveySimpleType[];
  loading: boolean;
}

const SurveyList: FC<ISurveyList> = ({ list, loading, children }) => {
  return (
    <div
      className={cls('w-full flex-1', {
        'h-full flex items-center justify-center': list.length === 0,
      })}
    >
      {/* 问卷列表 */}
      {list.length > 0 ? (
        <div className='space-y-4 pb-4'>
          {list.map((item) => {
            const { _id } = item;
            return <ListCard key={_id} {...item} />;
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
};

export default SurveyList;
