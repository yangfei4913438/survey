import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import React, { FC } from 'react';

import { EchartsAutoSize, type PieOptionType } from '@/components/Echarts';
import useProjectRoute from '@/hooks/useProjectRoute';
import useSurveyEditor from '@/hooks/useSurveyEditor';
import { getComponentStatListServices } from '@/services/stat';

// 单选数据使用饼图渲染
const StatComponent: FC<PieOptionType> = (options) => {
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
  console.log('selected:', selectedComponent);
  console.log('data:', data);

  return (
    <EchartsAutoSize
      echartsOption={{ label: selectedComponent?.title, list: data!.stat }}
      chartType={'pie'}
    />
  );
};

export default StatComponent;
