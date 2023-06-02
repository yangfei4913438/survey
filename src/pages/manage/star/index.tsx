import { Empty } from 'antd';
import React, { FC, useEffect } from 'react';

import ListCard from '@/components/ListCard';
import ListTitle from '@/components/ListTitle';
import { actions } from '@/consts/actions';
import useProjectRoute from '@/hooks/useProjectRoute';
import { list } from '@/pages/manage/mock';
import styles from '@/styles/manage/list.module.scss';

const ManageStar: FC = () => {
  const { goToRoute } = useProjectRoute();

  const { searchParams } = useProjectRoute();

  useEffect(() => {
    console.log('star params:', searchParams.get(actions.manage.searchKey));
  }, [searchParams]);

  const startList = list.filter((item) => item.isStar);

  return (
    <div className={styles.container}>
      <ListTitle name='星标问卷' />
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

export default ManageStar;
