import type { EChartsCoreOption, EChartsType } from 'echarts/core';

export type ChartType = 'echarts' | 'bar' | 'pie';

export interface EchartsProps {
  // 图表类型
  chartType: ChartType;
  echartsOption: ChartTypeOptions;
  className?: string;
  width?: number | 'auto';
  height?: number;
  themeType?: string;
  eventHandlers?: EventHandlers;
  zrEventHandlers?: EventHandlers;
  selectedValues?: Record<number, string>;
  forceClear?: boolean;
}

export interface EchartsHandler {
  getEchartsInstance: () => EChartsType | undefined;
}

export type EventHandlers = Record<string, { (props: any): void }>;

// 注意：这里的属性，如果值不一样，请不要用相同的名称，是否必定报错！

// 饼图的数据类型
export type PieOptionType = {
  // 选中的组件名称
  label?: string;
  // 传递进组件的数据结构
  list?: { name: string; value: number }[];
  // 这个是要全局替换的，下同
  options?: Partial<EChartsCoreOption>;
};

// 柱状图的数据类型
export type BarOptionType = {
  // 选中的组件名称
  label?: string;
  // 传递进组件的数据结构
  list?: { name: string; value: number }[];
  options?: Partial<EChartsCoreOption>;
};

// 图表的联合类型
export type ChartTypeOptions = PieOptionType | BarOptionType;
