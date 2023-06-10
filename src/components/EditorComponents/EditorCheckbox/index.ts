import { editorComponentTypes } from '@/consts/editorComponent';

import type { EditorComponentConfType } from '../editorComponentTypes';
import Component from './Component';
import { EditorCheckboxDefaultProps } from './interface';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';

export * from './interface';

const EditorCheckboxConf: EditorComponentConfType = {
  title: '多选框',
  type: editorComponentTypes.checkbox,
  Component,
  PropComponent,
  StatComponent,
  defaultProps: EditorCheckboxDefaultProps,
};

export default EditorCheckboxConf;
