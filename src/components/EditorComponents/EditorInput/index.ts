/**
 * @description 问卷 输入框组件
 * */

import { editorComponentTypes } from '@/consts/editorComponent';

import type { EditorComponentConfType } from '../editorComponentTypes';
import Component from './Component';
import { EditorInputDefaultProps } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

const EditorInputConf: EditorComponentConfType = {
  title: '普通输入框',
  type: editorComponentTypes.input,
  Component: Component,
  PropComponent: PropComponent,
  defaultProps: EditorInputDefaultProps,
};

export default EditorInputConf;
