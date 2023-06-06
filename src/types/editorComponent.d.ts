// 问卷输入框，传入参数类型
interface EditorInputPropsType {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: EditorInputPropsType) => void;
  disabled?: boolean;
}

// 问卷标题，传入参数类型
interface EditorTitlePropsType {
  text?: string;
  level?: TitleLevelType;
  alignment?: TextAlignType;
  onChange?: (newProps: EditorTitlePropsType) => void;
  disabled?: boolean;
}

// 编辑器各种组件的 props， 与
type EditorComponentsPropsType = EditorTitlePropsType & EditorInputPropsType;

// 编辑器组件类型
type EditorComponentTypes = 'editor_title' | 'editor_input';
// 编辑器组件对象Key数组
const EditorComponentTypeKeyNames = <const>['title', 'input'];
// 编辑器组件类型key
type EditorComponentTypeKeyName = (typeof EditorComponentTypeKeyNames)[number];
// 编辑器组件对象类型
type EditorComponentTypesObjectType = { [k in EditorComponentTypeKeyName]: EditorComponentTypes };
