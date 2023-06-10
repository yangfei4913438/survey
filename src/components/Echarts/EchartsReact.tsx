import { ECharts, init, registerTheme } from 'echarts';
import React, {
  forwardRef,
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
import { BarOptionType, EchartsHandler, EchartsProps, PieOptionType } from './types';

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
      selectedValues = {},
    }: EchartsProps,
    ref: React.Ref<EchartsHandler>
  ) => {
    const divRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<ECharts>();
    const currentSelection = useMemo(() => Object.keys(selectedValues) || [], [selectedValues]);
    const previousSelection = useRef<string[]>([]);
    const lastTheme = useRef<string>();

    useImperativeHandle(ref, () => ({
      getEchartsInstance: () => chartRef.current,
    }));

    useLayoutEffect(() => {
      // 注册多种主题
      registerTheme(defaultTheme.themeName, defaultTheme.theme);
      registerTheme(customBar.themeName, customBar.theme);
    }, []);

    // 监听宽度
    useEffect(() => {
      const resize = () => {
        chartRef.current?.resize({ width: width, height: height });
      };
      window.addEventListener('resize', resize);
      return () => {
        window.removeEventListener('resize', resize);
      };
    }, [width, height]);

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

    useEffect(() => {
      if (!divRef.current) return;
      if (!chartRef.current) {
        lastTheme.current = themeType;
        // 初始化
        chartRef.current = init(divRef.current, themeType);
      }

      Object.entries(eventHandlers || {}).forEach(([name, handler]) => {
        chartRef.current?.off(name);
        chartRef.current?.on(name, handler);
      });

      Object.entries(zrEventHandlers || {}).forEach(([name, handler]) => {
        chartRef.current?.getZr().off(name);
        chartRef.current?.getZr().on(name, handler);
      });

      chartRef.current?.setOption(TypeOptions, true, true);
    }, [TypeOptions, eventHandlers, zrEventHandlers, themeType, echartsOption, chartType]);

    useEffect(() => {
      // 选项变化或主题变化，触发更新
      if (chartRef.current && divRef.current && lastTheme.current !== themeType) {
        lastTheme.current = themeType;
        chartRef.current?.clear();
        chartRef.current?.dispose();
        chartRef.current = init(divRef.current, themeType);
        chartRef.current.setOption(TypeOptions, true, true);
        chartRef.current.resize({ width: width, height: height });
      }
    }, [width, height, TypeOptions, themeType, echartsOption, chartType]);

    useEffect(() => {
      if (chartRef.current && divRef.current) {
        chartRef.current?.clear();
        chartRef.current?.dispose();
        chartRef.current = init(divRef.current, themeType);
        chartRef.current.setOption(TypeOptions, false, false);
      }
    }, [TypeOptions, echartsOption, chartType, themeType]);

    // highlighting
    useEffect(() => {
      if (!chartRef.current) return;
      chartRef.current.dispatchAction({
        type: 'downplay',
        dataIndex: previousSelection.current.filter((value) => !currentSelection.includes(value)),
      });
      if (currentSelection.length) {
        chartRef.current.dispatchAction({
          type: 'highlight',
          dataIndex: currentSelection,
        });
      }
      previousSelection.current = currentSelection;
    }, [currentSelection]);

    useEffect(() => {
      if (chartRef.current) {
        chartRef.current.resize({ width: width, height: height });
      }
    }, [width, height]);

    return <div ref={divRef} className={className} style={{ width, height }} />;
  }
);

EchartsReact.displayName = 'EchartsReact';
