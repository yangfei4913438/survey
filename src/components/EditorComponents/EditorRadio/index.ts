import { FC } from 'react';

import { ChartTypeOptions } from '@/components/Echarts/types';
import { editorComponentTypes } from '@/consts/editorComponent';

import type { EditorComponentConfType } from '../editorComponentTypes';
import Component from './Component';
import { EditorRadioDefaultProps } from './interface';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';

export * from './interface';

const EditorRadioConf: EditorComponentConfType = {
  title: '单选输入框',
  type: editorComponentTypes.radio,
  Component: Component,
  PropComponent: PropComponent,
  StatComponent: StatComponent as FC<ChartTypeOptions>,
  defaultProps: EditorRadioDefaultProps,
};

export default EditorRadioConf;
