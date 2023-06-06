import { editorComponentTypes } from '@/consts/editorComponent';

import { EditorComponentConfType } from '../editorComponentTypes';
import EditorParagraph from './EditorParagraph';
import { EditorParagraphDefaultProps } from './interface';
import PropsParagraph from './PropsParagraph';

export * from './interface';

const EditorParagraphConf: EditorComponentConfType = {
  title: '段落文本',
  type: editorComponentTypes.paragraph,
  Component: EditorParagraph,
  PropComponent: PropsParagraph,
  defaultProps: EditorParagraphDefaultProps,
};

export default EditorParagraphConf;
