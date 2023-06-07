/**
 * @description 问卷 输入框组件
 * */

import { editorComponentTypes } from '@/consts/editorComponent';

import type { EditorComponentConfType } from '../editorComponentTypes';
import EditorInput from './EditorInput';
import { EditorInputDefaultProps } from './interface';
import PropsInput from './PropsInput';

export * from './interface';

const EditorInputConf: EditorComponentConfType = {
  title: '普通输入框',
  type: editorComponentTypes.input,
  Component: EditorInput,
  PropComponent: PropsInput,
  defaultProps: EditorInputDefaultProps,
};

export default EditorInputConf;
