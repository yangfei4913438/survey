/**
 * @description 问卷 标题组件
 * */

import { editorComponentTypesObject } from '@/consts/editorComponent';

import EditorTitle from './EditorTitle';
import { EditorTitleDefaultProps } from './interface';
import PropsTitle from './PropsTitle';

export * from './interface';

export default {
  title: '标题',
  type: editorComponentTypesObject.title,
  Component: EditorTitle,
  PropComponent: PropsTitle,
  defaultProps: EditorTitleDefaultProps,
};
