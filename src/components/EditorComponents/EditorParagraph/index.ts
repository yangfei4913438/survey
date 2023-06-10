import { editorComponentTypes } from '@/consts/editorComponent';

import { EditorComponentConfType } from '../editorComponentTypes';
import Component from './Component';
import { EditorParagraphDefaultProps } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

const EditorParagraphConf: EditorComponentConfType = {
  title: '段落文本',
  type: editorComponentTypes.paragraph,
  Component: Component,
  PropComponent: PropComponent,
  defaultProps: EditorParagraphDefaultProps,
};

export default EditorParagraphConf;
