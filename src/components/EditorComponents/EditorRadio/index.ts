import { editorComponentTypes } from '@/consts/editorComponent';

import { EditorComponentConfType } from '../editorComponentTypes';
import EditorRadio from './EditorRadio';
import { EditorRadioDefaultProps } from './interface';
import PropsRadio from './PropsRadio';

export * from './interface';

const EditorRadioConf: EditorComponentConfType = {
  title: '单选框',
  type: editorComponentTypes.radio,
  Component: EditorRadio,
  PropComponent: PropsRadio,
  defaultProps: EditorRadioDefaultProps,
};

export default EditorRadioConf;
