import { FC } from 'react';

import { ChartTypeOptions } from '@/components/Echarts/types';

// 统一的组件配置类型
export type EditorComponentConfType = {
  // 组件标题
  title: string;
  // 组件类型
  type: SurveyEditorComponentType;
  // 编辑器组件
  Component: FC<EditorComponentsPropsType>;
  // 参数组件
  PropComponent: FC<EditorComponentsPropsType>;
  // 统计组件, 只有交互组件才有这个组件
  StatComponent?: FC<ChartTypeOptions>;
  // 默认参数
  defaultProps: EditorComponentsPropsType;
};
