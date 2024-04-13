import { EChartsOption } from './index';
import { BarOptionType, PieOptionType } from './types';

function deepMerge(...objects: any[]) {
  const isObject = (obj: any) => obj && typeof obj === 'object';
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const prevVal = prev[key];
      const objVal = obj[key];
      if (Array.isArray(prevVal) && Array.isArray(objVal)) {
        prev[key] = prevVal.concat(...objVal);
      } else if (isObject(prevVal) && isObject(objVal)) {
        prev[key] = deepMerge(prevVal, objVal);
      } else {
        prev[key] = objVal;
      }
    });
    return prev;
  }, {});
}

const defaultTitle: EChartsOption['title'] = Object.freeze({
  text: '图表统计',
  left: 'center',
  textStyle: {
    fontSize: 28,
  },
});

const defaultTooltip: EChartsOption['tooltip'] = Object.freeze({
  trigger: 'item',
});

const defaultLegend: EChartsOption['legend'] = Object.freeze({
  orient: 'horizontal',
  left: 'center',
  top: '6%',
});

const defaultGrid: EChartsOption['grid'] = Object.freeze({
  left: '8%',
  top: '12%',
  right: '8%',
  bottom: '8%',
});

// 基础配置
const baseOption: EChartsOption['baseOption'] = Object.freeze({
  // title: defaultTitle, // 暂时设计直接在外部定义样式
  grid: defaultGrid,
  tooltip: defaultTooltip,
  legend: defaultLegend,
});

export const createPieOption = (options: PieOptionType): EChartsOption => {
  // 基础选项，自定义选项，自定义数据
  return deepMerge(baseOption, options?.options ?? {}, {
    xAxis: { show: false },
    yAxis: { show: false },
    series: [
      {
        name: options.label,
        type: 'pie',
        radius: '50%',
        data: options.list,
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
  return deepMerge(baseOption, options.options ?? {}, {
    xAxis: { show: true, type: 'category', data: options.list!.map((o) => o.name) },
    yAxis: {
      show: true,
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: options.list!.map((o) => o.value),
        name: options.label, // 系列名称
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
