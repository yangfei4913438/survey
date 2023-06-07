export const EditorRadioDefaultProps: Required<EditorRadioPropsType> = {
  title: '单选输入框',
  orientation: 'horizontal',
  options: [
    { value: 'option1', label: '选项1' },
    { value: 'option2', label: '选项2' },
    { value: 'option3', label: '选项3' },
  ],
  selected: '',
  onChange: () => undefined,
  disabled: false,
};
