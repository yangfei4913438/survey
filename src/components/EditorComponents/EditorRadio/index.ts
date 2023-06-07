import { editorComponentTypes } from '@/consts/editorComponent';

import type { EditorComponentConfType } from '../editorComponentTypes';
import EditorRadio from './EditorRadio';
import { EditorRadioDefaultProps } from './interface';
import PropsRadio from './PropsRadio';

export * from './interface';

const EditorRadioConf: EditorComponentConfType = {
  title: '单选输入框',
  type: editorComponentTypes.radio,
  Component: EditorRadio,
  PropComponent: PropsRadio,
  defaultProps: EditorRadioDefaultProps,
};

export default EditorRadioConf;
