import { Empty } from 'antd';
import React, { FC } from 'react';

import ListCard from '@/components/ListCard';
import useProjectRoute from '@/hooks/useProjectRoute';
import { list } from '@/pages/manage/mock';
import styles from '@/styles/manage/list.module.scss';

const ManageStart: FC = () => {
  const { goToRoute } = useProjectRoute();

  const startList = list.filter((item) => item.isStar);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span className='prose prose-2xl font-bold'>我的问卷</span>
        </div>
        <div className={styles.right}>{/*<ListSearch />*/}</div>
      </div>
      <div className={startList.length > 0 ? styles.content : styles.contentEmpty}>
        {/* 问卷列表 */}
        {startList.length > 0 ? (
          startList.map((q: any) => {
            const { _id } = q;
            return <ListCard key={_id} {...q} />;
          })
        ) : (
          <Empty description={'暂无数据'} />
        )}
      </div>
      <div className={styles.footer}>{/*<div ref={containerRef}>{LoadMoreContentElem}</div>*/}</div>
    </div>
  );
};

export default ManageStart;
