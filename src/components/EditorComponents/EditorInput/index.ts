/**
 * @description 问卷 输入框组件
 * */

import { editorComponentTypesObject } from '@/consts/editorComponent';

import EditorInput from './EditorInput';
import { EditorInputDefaultProps } from './interface';
import PropsInput from './PropsInput';

export * from './interface';

export default {
  title: '输入框',
  type: editorComponentTypesObject.input,
  Component: EditorInput, // 画布
  PropComponent: PropsInput, // 组件属性编辑
  defaultProps: EditorInputDefaultProps,
};
