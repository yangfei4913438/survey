import { useTitle } from 'ahooks';
import { Empty } from 'antd';
import React, { FC, useEffect } from 'react';

import ListCard from '@/components/ListCard';
import ListTitle from '@/components/ListTitle';
import { actions } from '@/consts/actions';
import useProjectRoute from '@/hooks/useProjectRoute';
import { list } from '@/pages/manage/mock';
import styles from '@/styles/manage/list.module.scss';

const ManageList: FC = () => {
  useTitle('星星问卷 - 我的问卷');

  const { searchParams } = useProjectRoute();

  useEffect(() => {
    console.log('list params:', searchParams.get(actions.manage.searchKey));
  }, [searchParams]);

  return (
    <div className={styles.wrapper}>
      <ListTitle name='我的问卷' />
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
