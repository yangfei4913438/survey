// 这里的类型声明，一定要转成必填项，否则TS解析会有问题。
export const EditorTitleDefaultProps: Required<EditorTitlePropsType> = {
  text: '段落标题',
  level: 5,
  alignment: 'left',
  onChange: () => undefined,
  disabled: false,
};
