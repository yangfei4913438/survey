/**
 * @description 问卷 标题组件
 * */

import { editorComponentTypes } from '@/consts/editorComponent';

import { EditorComponentConfType } from '../editorComponentTypes';
import Component from './Component';
import { EditorTitleDefaultProps } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

const EditorTitleConf: EditorComponentConfType = {
  title: '段落标题',
  type: editorComponentTypes.title,
  Component: Component,
  PropComponent: PropComponent,
  defaultProps: EditorTitleDefaultProps,
};

export default EditorTitleConf;
