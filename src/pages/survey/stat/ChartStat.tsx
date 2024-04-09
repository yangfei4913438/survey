import { Empty, Typography } from 'antd';
import React, { FC } from 'react';

import { getComponentConfByType } from '@/components/EditorComponents';
import useSurveyEditor from '@/store/hooks/useSurveyEditor';

const ChartStat: FC = () => {
  const { selectedId, selectedComponent } = useSurveyEditor();

  const EmptyStatComponent = (
    <div className={'flex flex-1 items-center justify-center'}>
      <Empty description={'没有选中任何可统计组件'} />
    </div>
  );

  const getStatELem = () => {
    if (!selectedId) return EmptyStatComponent;

    const conf = getComponentConfByType(selectedComponent!.type);

    if (!conf) return EmptyStatComponent;

    const { StatComponent } = conf;

    if (!StatComponent) return EmptyStatComponent;

    return (
      <div className={'flex flex-1 items-center justify-center'}>
        <StatComponent />
      </div>
    );
  };

  return (
    <div className={'flex h-full flex-col'}>
      <div className='py-4 text-center'>
        <Typography.Title level={3}>图表统计</Typography.Title>
      </div>
      {getStatELem()}
    </div>
  );
};

export default ChartStat;
