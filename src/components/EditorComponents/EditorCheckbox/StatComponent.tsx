import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import React, { FC } from 'react';

import { type BarOptionType, EchartsAutoSize, PieOptionType } from '@/components/Echarts';
import useSurveyEditor from '@/hooks/store/useSurveyEditor';
import useProjectRoute from '@/hooks/useProjectRoute';
import { getComponentStatListServices } from '@/services/stat';

// 多选数据使用柱状图渲染
const StatComponent: FC<BarOptionType> = (options) => {
  const { selectedComponent, selectedId } = useSurveyEditor();

  const {
    pathParams: { id = '' },
  } = useProjectRoute();

  const { loading, data } = useRequest(
    async () => {
      // 返回请求结果
      return await getComponentStatListServices<{ stat: BarOptionType['list'] }>(id, selectedId);
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
      echartsOption={{ label: selectedComponent?.title, list: data?.stat }}
      chartType={'bar'}
    />
  );
};

export default StatComponent;
