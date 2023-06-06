import { editorComponentTypes } from '@/consts/editorComponent';

import type { EditorComponentConfType } from '../editorComponentTypes';
import EditorHeader from './EditorHeader';
import { EditorHeaderDefaultProps } from './interface';
import PropsHeader from './PropsHeader';

export * from './interface';

const EditorHeaderConf: EditorComponentConfType = {
  title: '问卷标题',
  type: editorComponentTypes.header,
  Component: EditorHeader,
  PropComponent: PropsHeader,
  defaultProps: EditorHeaderDefaultProps,
};

export default EditorHeaderConf;
