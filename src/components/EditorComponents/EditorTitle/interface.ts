// 这里的类型声明，一定要转成必填项，否则TS解析会有问题。
export const EditorTitleDefaultProps: Required<EditorTitlePropsType> = {
  text: 'Level 1 Title',
  level: 1,
  alignment: 'left',
  onChange: () => undefined,
  disabled: false,
};
