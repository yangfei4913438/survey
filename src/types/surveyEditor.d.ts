// 标题等级
type TitleLevelType = 1 | 2 | 3 | 4 | 5;

// 文本对齐方式
type TextAlignType = 'left' | 'center' | 'right';

// 排列方向: 水平 | 垂直
type Orientation = 'horizontal' | 'vertical';

// 一般选项
interface SelectOption {
  // 显示标签
  label: string;
  // 选项值
  value: string;
}

// CheckBox选项
interface CheckboxOption extends SelectOption {
  // 是否被选中
  checked: boolean;
  // 是否被禁用
  disabled?: boolean;
}

// 问卷编辑器的组件接口
interface SurveyEditorComponentTypes {
  header: 'editor_header';
  title: 'editor_title';
  paragraph: 'editor_paragraph';
  input: 'editor_input';
  textarea: 'editor_textarea';
  radio: 'editor_radio';
  checkbox: 'editor_checkbox';
}
// 问卷编辑器组件的类型名称
type SurveyEditorComponentTypeName = keyof SurveyEditorComponentTypes;
// 问卷编辑器组件的类型
type SurveyEditorComponentType = SurveyEditorComponentTypes[SurveyEditorComponentTypeName];
