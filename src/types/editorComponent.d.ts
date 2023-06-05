// 问卷输入框，传入参数类型
interface EditorInputPropsType {
  /** Input Title
   * @default 'Input Title'
   */
  title?: string;
  /** Input tip Text
   * @default 'Please enter...'
   */
  placeholder?: string;
}

// 问卷标题，传入参数类型
interface EditorTitlePropsType {
  /** Title Text
   * @default 'Default Title'
   */
  text?: string;
  /** Title Level
   * @default 1
   */
  level?: TitleLevelType;
  /** Title Text Alignment
   * @default 'left'
   */
  alignment?: TextAlignType;
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
