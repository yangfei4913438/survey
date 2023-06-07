import { editorComponentTypes } from '@/consts/editorComponent';

import type { EditorComponentConfType } from '../editorComponentTypes';
import EditorCheckbox from './EditorCheckbox';
import { EditorCheckboxDefaultProps } from './interface';
import PropsCheckbox from './PropsCheckbox';

export * from './interface';

const EditorCheckboxConf: EditorComponentConfType = {
  title: '多选框',
  type: editorComponentTypes.checkbox,
  Component: EditorCheckbox,
  PropComponent: PropsCheckbox,
  defaultProps: EditorCheckboxDefaultProps,
};

export default EditorCheckboxConf;
