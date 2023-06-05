/**
 * @description 问卷 输入框组件
 * */

import { editorComponentTypesObject } from '@/consts/editorComponent';

import EditorInput from './EditorInput';
import { EditorInputDefaultProps } from './interface';

export * from './interface';

export default {
  title: '输入框',
  type: editorComponentTypesObject.input,
  Component: EditorInput,
  defaultProps: EditorInputDefaultProps,
};
