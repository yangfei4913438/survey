// 表单控制类型
interface FormControlType<T> {
  // 接受数据回传
  onChange?: (newProps: T) => void;
  // 是否禁用表单
  disabled?: boolean;
}

// 问卷头，传入参数类型
interface EditorHeaderPropsType extends FormControlType<EditorHeaderPropsType> {
  title?: string;
  titleLevel?: TitleLevelType;
  titleAlignment?: TextAlignType;
  desc?: string;
  descAlignment?: TextAlignType;
}
// 问卷标题，传入参数类型
interface EditorTitlePropsType extends FormControlType<EditorTitlePropsType> {
  text?: string;
  level?: TitleLevelType;
  alignment?: TextAlignType;
}
// 问卷段落，传入参数类型
interface EditorParagraphPropsType extends FormControlType<EditorParagraphPropsType> {
  text?: string;
  alignment?: TextAlignType;
}

// 问卷输入框，传入参数类型
interface EditorInputPropsType extends FormControlType<EditorInputPropsType> {
  title?: string;
  placeholder?: string;
}
// 问卷文本区域输入框，传入参数类型
interface EditorTextareaPropsType extends FormControlType<EditorTextareaPropsType> {
  title?: string;
  placeholder?: string;
}

// 编辑器各种组件的 props， 与
type EditorComponentsPropsType = EditorHeaderPropsType &
  EditorTitlePropsType &
  EditorParagraphPropsType &
  EditorInputPropsType &
  EditorTextareaPropsType;
