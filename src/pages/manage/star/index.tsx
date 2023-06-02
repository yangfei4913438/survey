import { Empty } from 'antd';
import cls from 'classnames';
import React, { FC, useEffect } from 'react';

import ListCard from '@/components/ListCard';
import ListTitle from '@/components/ListTitle';
import { actions } from '@/consts/actions';
import useProjectRoute from '@/hooks/useProjectRoute';
import { list } from '@/pages/manage/mock';
import styles from '@/styles/base.module.scss';

const ManageStar: FC = () => {
  const { goToRoute } = useProjectRoute();

  const { searchParams } = useProjectRoute();

  useEffect(() => {
    console.log('star params:', searchParams.get(actions.manage.searchKey));
  }, [searchParams]);

  const startList = list.filter((item) => item.isStar);

  return (
    <div className={''}>
      <ListTitle name='星标问卷' />
      <div
        className={cls(
          'w-full h-full',
          {
            'space-y-4': startList.length > 0,
          },
          startList.length === 0 && styles.flexCenter
        )}
      >
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
