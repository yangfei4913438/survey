/**
 * @description 问卷 文本区域输入框
 * */

import { editorComponentTypes } from '@/consts/editorComponent';

import { EditorComponentConfType } from '../editorComponentTypes';
import EditorTextarea from './EditorTextarea';
import { EditorTextareaDefaultProps } from './interface';
import PropsTextarea from './PropsTextarea';

export * from './interface';

const EditorTextareaConf: EditorComponentConfType = {
  title: '文本区域输入框',
  type: editorComponentTypes.textarea,
  Component: EditorTextarea, // 画布
  PropComponent: PropsTextarea, // 组件属性编辑
  defaultProps: EditorTextareaDefaultProps,
};

export default EditorTextareaConf;
