// 标题等级
type TitleLevelType = 1 | 2 | 3 | 4 | 5;

// 文本对齐方式
type TextAlignType = 'left' | 'center' | 'right';

// 排列方向: 水平 | 垂直
type Orientation = 'horizontal' | 'vertical';

// 选项类型
type SelectOption = { label: string; value: string };

// 问卷编辑器的组件接口
interface SurveyEditorComponentTypes {
  header: 'editor_header';
  title: 'editor_title';
  paragraph: 'editor_paragraph';
  input: 'editor_input';
  textarea: 'editor_textarea';
  radio: 'editor_radio';
}
// 问卷编辑器组件的类型名称
type SurveyEditorComponentTypeName = keyof SurveyEditorComponentTypes;
// 问卷编辑器组件的类型
type SurveyEditorComponentType = SurveyEditorComponentTypes[SurveyEditorComponentTypeName];
