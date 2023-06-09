import { useTitle } from 'ahooks';
import { Button, Result, Spin } from 'antd';
import cls from 'classnames';
import React, { FC, useState } from 'react';

import useProjectRoute from '@/hooks/useProjectRoute';
import useSurveyEditor from '@/hooks/useSurveyEditor';
import ComponentList from '@/pages/survey/stat/ComponentList';
import StatHeader from '@/pages/survey/stat/StatHeader';
import styles from '@/styles/base.module.scss';

const SurveyStat: FC = () => {
  const { toPrevRoute } = useProjectRoute();
  const { pageInfo, editorComponentList, isLoading, selectedId } = useSurveyEditor();
  // 设置页面标题
  useTitle(`星星问卷${pageInfo.title ? ' - ' + pageInfo.title : ''}`);

  // 状态提升 selectedId type
  const [selectedComponentId, setSelectedComponentId] = useState(selectedId);
  const [selectedComponentType, setSelectedComponentType] = useState('');

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
      <article className={'flex h-full space-x-4'}>
        <ComponentList
          selectedComponentId={selectedComponentId}
          setSelectedComponentId={setSelectedComponentId}
          setSelectedComponentType={setSelectedComponentType}
        />
        <div className={'flex flex-1 items-center justify-center bg-yellow-500'}>中间</div>
        <div className={'flex flex-1 items-center justify-center bg-green-400'}>右边</div>
      </article>
    );
  };

  return (
    <section className={'flex h-full min-w-lg flex-col bg-gray-50'}>
      <StatHeader />
      <article className='w-full flex-1 overflow-hidden p-6'>
        {isLoading ? LoadingElem : renderContentElem()}
      </article>
    </section>
  );
};

export default SurveyStat;
