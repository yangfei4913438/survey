import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import React, { FC } from 'react';

import { EchartsReact, type PieOptionType } from '@/components/Echarts';
import { type ChartTypeOptions } from '@/components/Echarts/types';
import useProjectRoute from '@/hooks/useProjectRoute';
import { getComponentStatListServices } from '@/services/stat';
import useSurveyEditor from '@/store/hooks/useSurveyEditor';

// 单选数据使用饼图渲染
const StatComponent: FC<PieOptionType | ChartTypeOptions> = (options) => {
  const { selectedComponent, selectedId } = useSurveyEditor();
  const {
    pathParams: { id = '' },
  } = useProjectRoute();

  const { loading, data } = useRequest(
    async () => {
      // 返回请求结果
      return await getComponentStatListServices<{ stat: PieOptionType['list'] }>(id, selectedId);
    },
    {
      ready: !!id && !!selectedId,
      refreshDeps: [selectedId, id], // 重新发起请求的依赖项
    }
  );

  if (loading) {
    return <Spin size={'large'} />;
  }

  return (
    <EchartsReact
      echartsOption={{ label: selectedComponent?.props.title ?? '', list: data?.stat ?? [] }}
      chartType={'pie'}
      width={448}
      height={500}
      forceClear={!selectedId}
    />
  );
};

export default StatComponent;
