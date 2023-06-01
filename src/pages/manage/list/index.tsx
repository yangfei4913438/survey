import { useTitle } from 'ahooks';
import { Empty } from 'antd';
import React, { FC } from 'react';

import ListCard from '@/components/ListCard';
import useProjectRoute from '@/hooks/useProjectRoute';
import { list } from '@/pages/manage/mock';
import styles from '@/styles/manage/list.module.scss';

const ManageList: FC = () => {
  useTitle('星星问卷 - 我的问卷');
  const { goToRoute } = useProjectRoute();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span className='prose prose-2xl font-bold'>我的问卷</span>
        </div>
        <div className={styles.right}>{/*<ListSearch />*/}</div>
      </div>
      <div className={list.length > 0 ? styles.content : styles.contentEmpty}>
        {/* 问卷列表 */}
        {list.length > 0 ? (
          list.map((q: any) => {
            const { _id } = q;
            return <ListCard key={_id} {...q} />;
          })
        ) : (
          <Empty />
        )}
      </div>
      <div className={styles.footer}>{/*<div ref={containerRef}>{LoadMoreContentElem}</div>*/}</div>
    </div>
  );
};

export default ManageList;
