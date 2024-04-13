// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, PieChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { dispose, type EChartsType, init, registerTheme, use } from 'echarts/core';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import ignore from 'ignore';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import { type EChartsOption } from '@/components/Echarts';

import { createBarOption, createPieOption } from './config';
import customBar from './themes/custom_bar.json';
import defaultTheme from './themes/default.json';
import type { BarOptionType, EchartsHandler, EchartsProps, PieOptionType } from './types';

// 注册必须的组件
use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export const EchartsReact = forwardRef(
  (
    {
      chartType,
      width = 'auto',
      height = 500,
      className,
      themeType = defaultTheme.themeName,
      echartsOption,
      eventHandlers,
      zrEventHandlers,
    }: EchartsProps,
    ref: React.Ref<EchartsHandler>
  ) => {
    const divRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<EChartsType>();
    const lastTheme = useRef<string>();
    const lastType = useRef<string>('');

    useImperativeHandle(ref, () => ({
      getEchartsInstance: () => chartRef.current,
    }));

    useLayoutEffect(() => {
      // 注册多种主题
      registerTheme(defaultTheme.themeName, defaultTheme.theme);
      registerTheme(customBar.themeName, customBar.theme);
    }, []);

    const TypeOptions = useMemo<EChartsOption>(() => {
      switch (chartType) {
        case 'pie':
          return createPieOption(echartsOption as PieOptionType);
        case 'bar':
          return createBarOption(echartsOption as BarOptionType);
        default:
          return echartsOption as EChartsOption;
      }
    }, [echartsOption, chartType]);

    const initChart = useCallback(() => {
      if (!divRef.current) return;
      chartRef.current = init(divRef.current, themeType);
      chartRef.current.setOption(TypeOptions, true, false);
      Object.entries(eventHandlers || {}).forEach(([name, handler]) => {
        chartRef.current?.off(name);
        chartRef.current?.on(name, handler);
      });
      Object.entries(zrEventHandlers || {}).forEach(([name, handler]) => {
        chartRef.current?.getZr().off(name);
        chartRef.current?.getZr().on(name, handler);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themeType, TypeOptions, echartsOption, chartType, eventHandlers, zrEventHandlers]);

    // 监听宽度变化
    useEffect(() => {
      const resize = () => {
        chartRef.current?.resize({ width: width, height: height });
      };
      window.addEventListener('resize', resize);
      return () => {
        window.removeEventListener('resize', resize);
      };
    }, [width, height]);

    // 处理类型变化
    useLayoutEffect(() => {
      if (chartRef.current && divRef.current && lastType.current !== chartType) {
        chartRef.current.clear();
        chartRef.current.setOption(TypeOptions, true, false);
      }
    }, [TypeOptions, echartsOption, chartType]);

    // 只处理初始化
    useLayoutEffect(() => {
      if (!divRef.current) return;
      if (!chartRef.current) {
        lastTheme.current = themeType;
        lastType.current = chartType;
        // 初始化
        initChart();
      }
      return () => {
        if (chartRef.current) {
          dispose(chartRef.current);
        }
        Object.entries(eventHandlers || {}).forEach(([name, handler]) => {
          chartRef.current?.off(name);
        });
        Object.entries(zrEventHandlers || {}).forEach(([name, handler]) => {
          chartRef.current?.getZr().off(name);
        });
      };
    }, [
      initChart,
      TypeOptions,
      echartsOption,
      chartType,
      themeType,
      eventHandlers,
      zrEventHandlers,
    ]);

    // 处理主题切换
    useLayoutEffect(() => {
      if (chartRef.current && divRef.current && lastTheme.current !== themeType) {
        lastTheme.current = themeType;
        dispose(chartRef.current);
        initChart();
      }
    }, [initChart, TypeOptions, echartsOption, chartType, themeType]);

    return <div ref={divRef} className={className} style={{ width, height }} />;
  }
);

EchartsReact.displayName = 'EchartsReact';
