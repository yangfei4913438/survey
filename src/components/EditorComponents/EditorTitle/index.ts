/**
 * @description 问卷 标题组件
 * */

import { editorComponentTypes } from '@/consts/editorComponent';

import { EditorComponentConfType } from '../editorComponentTypes';
import EditorTitle from './EditorTitle';
import { EditorTitleDefaultProps } from './interface';
import PropsTitle from './PropsTitle';

export * from './interface';

const EditorTitleConf: EditorComponentConfType = {
  title: '段落标题',
  type: editorComponentTypes.title,
  Component: EditorTitle,
  PropComponent: PropsTitle,
  defaultProps: EditorTitleDefaultProps,
};

export default EditorTitleConf;
