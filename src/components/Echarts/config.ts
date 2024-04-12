import merge from 'lodash-es/merge';

import { EChartsOption } from './index';
import { BarOptionType, PieOptionType } from './types';

const defaultTitle: EChartsOption['title'] = {
  text: '图表统计',
  left: 'center',
  textStyle: {
    fontSize: 28,
  },
};

const defaultTooltip: EChartsOption['tooltip'] = {
  trigger: 'item',
};

const defaultLegend: EChartsOption['legend'] = {
  orient: 'horizontal',
  left: 'center',
  top: '6%',
};

const defaultGrid: EChartsOption['grid'] = {
  left: '8%',
  top: '12%',
  right: '8%',
  bottom: '8%',
};

// 基础配置
const baseOption: EChartsOption['baseOption'] = {
  // title: defaultTitle, // 暂时设计直接在外部定义样式
  grid: defaultGrid,
  tooltip: defaultTooltip,
  legend: defaultLegend,
};

export const createPieOption = (options: PieOptionType): EChartsOption => {
  console.log('options:', options);
  // 基础选项，自定义选项，自定义数据
  return merge(baseOption, options?.options ?? {}, {
    xAxis: { show: false },
    yAxis: { show: false },
    series: [
      {
        name: options?.label,
        type: 'pie',
        radius: '50%',
        data: options?.list,
        label: {
          formatter: '{b}: {c}',
          color: 'inherit',
          textBorderColor: 'inherit',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }) as EChartsOption;
};

export const createBarOption = (options: BarOptionType): EChartsOption => {
  // 目前只有单个系列的操作
  return merge(baseOption, options?.options ?? {}, {
    xAxis: { show: true, type: 'category', data: options!.list?.map((o) => o.name) },
    yAxis: {
      show: true,
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: options.list?.map?.((o) => o.value),
        name: options?.label ?? '', // 系列名称
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });
};
