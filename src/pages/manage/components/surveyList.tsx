import { Empty, Spin } from 'antd';
import cls from 'classnames';
import React, { FC } from 'react';

import ListCard from '@/components/ListCard';
import ListTitle from '@/components/ListTitle';

interface ISurveyList {
  title: string;
  list: SurveySimpleType[];
  loading: boolean;
}

const SurveyList: FC<ISurveyList> = ({ title, list, loading }) => {
  return (
    <div className={cls('flex h-full flex-col space-y-4')}>
      <ListTitle name={title} />
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

export default SurveyList;
