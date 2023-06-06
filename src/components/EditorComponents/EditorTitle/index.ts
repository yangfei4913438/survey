/**
 * @description 问卷 标题组件
 * */

import { editorComponentTypesObject } from '@/consts/editorComponent';

import { EditorComponentConfType } from '../editorComponentTypes';
import EditorTitle from './EditorTitle';
import { EditorTitleDefaultProps } from './interface';
import PropsTitle from './PropsTitle';

export * from './interface';

const editorTitleConf: EditorComponentConfType = {
  title: '标题',
  type: editorComponentTypesObject.title,
  Component: EditorTitle,
  PropComponent: PropsTitle,
  defaultProps: EditorTitleDefaultProps,
};

export default editorTitleConf;
