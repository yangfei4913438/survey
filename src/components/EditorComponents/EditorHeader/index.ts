import { editorComponentTypes } from '@/consts/editorComponent';

import type { EditorComponentConfType } from '../editorComponentTypes';
import Component from './Component';
import { EditorHeaderDefaultProps } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

const EditorHeaderConf: EditorComponentConfType = {
  title: '问卷标题',
  type: editorComponentTypes.header,
  Component: Component,
  PropComponent: PropComponent,
  defaultProps: EditorHeaderDefaultProps,
};

export default EditorHeaderConf;
