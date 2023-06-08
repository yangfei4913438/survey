import { useTitle } from 'ahooks';
import { Button, Result, Spin } from 'antd';
import cls from 'classnames';
import React, { FC } from 'react';

import useProjectRoute from '@/hooks/useProjectRoute';
import useSurveyEditor from '@/hooks/useSurveyEditor';
import StatHeader from '@/pages/survey/stat/StatHeader';
import styles from '@/styles/base.module.scss';

const SurveyStat: FC = () => {
  const { toPrevRoute } = useProjectRoute();
  const { pageInfo, editorComponentList, isLoading } = useSurveyEditor();
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
      <article className={'flex h-full text-center'}>
        <div className={'flex flex-1 items-center justify-center bg-red-400'}>左边</div>
        <div className={'flex flex-1 items-center justify-center bg-yellow-500'}>中间</div>
        <div className={'flex flex-1 items-center justify-center bg-green-400'}>右边</div>
      </article>
    );
  };

  return (
    <section className={'flex h-full min-w-lg flex-col bg-gray-50'}>
      <StatHeader />
      <article className='w-full flex-1 p-6'>
        {isLoading ? LoadingElem : renderContentElem()}
      </article>
    </section>
  );
};

export default SurveyStat;
