export const EditorCheckboxDefaultProps: Required<EditorCheckboxPropsType> = {
  title: '多选输入框',
  orientation: 'horizontal',
  list: [
    { value: 'option1', label: '选项1', checked: false, disabled: false },
    { value: 'option2', label: '选项2', checked: false, disabled: false },
    { value: 'option3', label: '选项3', checked: false, disabled: false },
  ],
  onChange: () => undefined,
  disabled: false,
};
