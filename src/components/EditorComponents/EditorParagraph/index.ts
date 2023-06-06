import { editorComponentTypesObject } from '@/consts/editorComponent';

import { EditorComponentConfType } from '../editorComponentTypes';
import EditorParagraph from './EditorParagraph';
import { EditorParagraphDefaultProps } from './interface';
import PropsParagraph from './PropsParagraph';

export * from './interface';

const editorParagraphConf: EditorComponentConfType = {
  title: '段落',
  type: editorComponentTypesObject.paragraph,
  Component: EditorParagraph,
  PropComponent: PropsParagraph,
  defaultProps: EditorParagraphDefaultProps,
};

export default editorParagraphConf;
