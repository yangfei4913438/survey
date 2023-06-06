// 表单控制类型
interface FormControlType<T> {
  // 接受数据回传
  onChange?: (newProps: T) => void;
  // 是否禁用表单
  disabled?: boolean;
}

// 问卷输入框，传入参数类型
interface EditorInputPropsType extends FormControlType<EditorInputPropsType> {
  title?: string;
  placeholder?: string;
}

// 问卷标题，传入参数类型
interface EditorTitlePropsType extends FormControlType<EditorTitlePropsType> {
  text?: string;
  level?: TitleLevelType;
  alignment?: TextAlignType;
}

// 问卷段落，穿入参数类型
interface EditorParagraphPropsType extends FormControlType<EditorParagraphPropsType> {
  text?: string;
  alignment?: TextAlignType;
}

// 编辑器各种组件的 props， 与
type EditorComponentsPropsType = EditorTitlePropsType &
  EditorInputPropsType &
  EditorParagraphPropsType;

// 编辑器组件类型
type EditorComponentTypes = 'editor_title' | 'editor_input' | 'editor_paragraph';
