/**
 * @description 问卷 文本区域输入框
 * */

import { editorComponentTypes } from '@/consts/editorComponent';

import { EditorComponentConfType } from '../editorComponentTypes';
import Component from './Component';
import { EditorTextareaDefaultProps } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

const EditorTextareaConf: EditorComponentConfType = {
  title: '文本区域输入框',
  type: editorComponentTypes.textarea,
  Component: Component, // 画布
  PropComponent: PropComponent, // 组件属性编辑
  defaultProps: EditorTextareaDefaultProps,
};

export default EditorTextareaConf;
