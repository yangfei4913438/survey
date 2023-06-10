import { useTitle } from 'ahooks';
import { Button, Result, Spin } from 'antd';
import cls from 'classnames';
import React, { FC, useState } from 'react';

import useProjectRoute from '@/hooks/useProjectRoute';
import useSurveyEditor from '@/hooks/useSurveyEditor';
import ChartStat from '@/pages/survey/stat/ChartStat';
import ComponentList from '@/pages/survey/stat/ComponentList';
import PageStat from '@/pages/survey/stat/PageStat';
import StatHeader from '@/pages/survey/stat/StatHeader';
import styles from '@/styles/base.module.scss';

const SurveyStat: FC = () => {
  const { toPrevRoute } = useProjectRoute();
  const { pageInfo, isLoading } = useSurveyEditor();
  // 设置页面标题
  useTitle(`星星问卷${pageInfo.title ? ' - ' + pageInfo.title : ''}`);

  const LoadingElem = (
    <div className={cls(styles.flexCenter, 'h-full')}>
      <Spin size={'large'} />
    </div>
  );

  const renderContentElem = () => {
    if (typeof pageInfo.isPublished === 'boolean' && !pageInfo.isPublished) {
      return (
        <article className={cls(styles.flexCenter, 'h-full')}>
          <Result
            status='warning'
            title='该页面尚未发布'
            extra={
              <Button type='primary' onClick={toPrevRoute}>
                返回
              </Button>
            }
          />
        </article>
      );
    }
    return (
      <article className={'flex flex-nowrap space-x-4'}>
        <div className={'w-80 rounded bg-white px-3 py-4 shadow hover:shadow-lg '}>
          <ComponentList />
        </div>
        <div className={'flex-1'}>
          <PageStat />
        </div>
        <div className={'w-120 rounded bg-white p-4 shadow hover:shadow-lg'}>
          <ChartStat />
        </div>
      </article>
    );
  };

  return (
    <section className={'flex h-full min-w-lg flex-col bg-gray-50'}>
      <StatHeader />
      <article className='w-full flex-1 overflow-auto p-6 '>
        {isLoading ? LoadingElem : renderContentElem()}
      </article>
    </section>
  );
};

export default SurveyStat;
